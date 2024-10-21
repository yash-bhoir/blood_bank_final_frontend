import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import decryptToken from "@/utility/decryptToken";

const bloodType = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  bloodType: z.string().min(1, "Blood Group is required"),
  birthDate: z.string().min(1, "Birth Date is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  phoneNumber: z.string().regex(/^\d+$/, "Phone Number must be numeric"),
  streetAddress: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().min(1, "Postal Code is required"),
  weight: z.number().min(1, "Weight must be greater than 0"),
  donatedPreviously: z.boolean().optional(),
  lastDonation: z.string().optional(),
  diseases: z.string().optional(),
  id: z.string().optional(), // Adding id field to the schema
});

type FormData = z.infer<typeof formSchema>;

const AddInfo = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    bloodType: "",
    birthDate: "",
    gender: "Male",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    weight: 0,
    donatedPreviously: false,
    lastDonation: "",
    diseases: "",
    id: "", // Initial state for id
  });

  const [errors, setErrors] = useState<z.ZodError<FormData> | null>(null);
  const [userId, setUserId] = useState<string>();
  const [userFormStatus, setUserFormStatus] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = decryptToken();
      const decodedUserId = userInfo?._id;

      if (decodedUserId) {
        setUserId(decodedUserId);
        await checkUserStatus(decodedUserId);
      } else {
        toast.error("User ID is not available. Please try again.");
      }
    };

    fetchData();
  },[]);

  const checkUserStatus = async (userId: string) => {
    const response = await fetch(
      "http://localhost:5173/api/v1/users/user-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    const data = await response.json();

    if (data.data.isFilled) {
      setUserFormStatus("Update");
      await updateData(userId);
    } else {
      setUserFormStatus("Add");
    }
  };

  const updateData = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5173/api/v1/UserInfo/user-info/getInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormData({
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          bloodType: data.data.bloodType || "",
          birthDate: data.data.Birth_Date
            ? new Date(data.data.Birth_Date).toISOString().split("T")[0]
            : "",
          gender: data.data.Gender || "Male",
          phoneNumber: data.data.Phone_Number || "",
          streetAddress: data.data.Street_Address || "",
          city: data.data.City || "",
          state: data.data.State || "",
          postalCode: data.data.Postal_Code || "",
          weight: data.data.Weight || 0,
          donatedPreviously: data.data.donated_previously || false,
          lastDonation: data.data.Last_donation
            ? new Date(data.data.Last_donation).toISOString().split("T")[0]
            : "",
          diseases: data.data.Diseases || "",
          id: data.data.id || "", // Set the id field from the response
        });
      } else {
        toast.error("Failed to fetch user info");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred while fetching user info");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "weight") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, bloodType: e.target.value });
  };

  const handleDateChange = (date: Date | null, field: keyof FormData) => {
    setFormData({
      ...formData,
      [field]: date ? date.toISOString().split("T")[0] : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      setErrors(validation.error);
    } else {
      setErrors(null);

      const dataToSubmit =
        userFormStatus === "Add" ? { ...formData, userId } : { ...formData }; // Don't include userId when updating

      const url =
        userFormStatus === "Add"
          ? "http://localhost:5173/api/v1/UserInfo/user-info"
          : "http://localhost:5173/api/v1/UserInfo/user-info/edit";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })
        .then((response) => {
          if (response.ok) {
            toast.success(
              `User info ${userFormStatus.toLowerCase()}ed successfully`
            );
          } else {
            throw new Error("Failed to submit the form");
          }
        })
        .catch(() => {
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black text-white">
      <ToastContainer />
      <div className="w-full md:w-1/2 p-8 bg-gray-900 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors?.formErrors?.fieldErrors.firstName
                  ? "border border-red-500"
                  : ""
              }`}
            />
            {errors?.formErrors?.fieldErrors.firstName && (
              <span className="text-red-500">
                {errors.formErrors.fieldErrors.firstName}
              </span>
            )}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors?.formErrors?.fieldErrors.lastName
                  ? "border border-red-500"
                  : ""
              }`}
            />
            {errors?.formErrors?.fieldErrors.lastName && (
              <span className="text-red-500">
                {errors.formErrors.fieldErrors.lastName}
              </span>
            )}
          </div>

          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleBloodGroupChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors?.formErrors?.fieldErrors.bloodType
                ? "border border-red-500"
                : ""
            }`}
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {bloodType.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors?.formErrors?.fieldErrors.bloodType && (
            <span className="text-red-500">
              {errors.formErrors.fieldErrors.bloodType}
            </span>
          )}

          <label className="block">Birth Date</label>
          <DatePicker
            selected={formData.birthDate ? new Date(formData.birthDate) : null}
            onChange={(date) => handleDateChange(date, "birthDate")}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors?.formErrors?.fieldErrors.birthDate
                ? "border border-red-500"
                : ""
            }`}
            placeholderText="Select Birth Date"
            dateFormat="yyyy-MM-dd"
          />
          {errors?.formErrors?.fieldErrors.birthDate && (
            <span className="text-red-500">
              {errors.formErrors.fieldErrors.birthDate}
            </span>
          )}

          <div className="flex space-x-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors?.formErrors?.fieldErrors.gender
                  ? "border border-red-500"
                  : ""
              }`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors?.formErrors?.fieldErrors.gender && (
              <span className="text-red-500">
                {errors.formErrors.fieldErrors.gender}
              </span>
            )}

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors?.formErrors?.fieldErrors.phoneNumber
                  ? "border border-red-500"
                  : ""
              }`}
            />
            {errors?.formErrors?.fieldErrors.phoneNumber && (
              <span className="text-red-500">
                {errors.formErrors.fieldErrors.phoneNumber}
              </span>
            )}
          </div>

          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors?.formErrors?.fieldErrors.streetAddress
                ? "border border-red-500"
                : ""
            }`}
          />
          {errors?.formErrors?.fieldErrors.streetAddress && (
            <span className="text-red-500">
              {errors.formErrors.fieldErrors.streetAddress}
            </span>
          )}

          <div className="flex space-x-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={`w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors?.formErrors?.fieldErrors.city
                  ? "border border-red-500"
                  : ""
              }`}
            />
            {errors?.formErrors?.fieldErrors.city && (
              <span className="text-red-500">
                {errors.formErrors.fieldErrors.city}
              </span>
            )}

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={`w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors?.formErrors?.fieldErrors.postalCode
                ? "border border-red-500"
                : ""
            }`}
          />
          {errors?.formErrors?.fieldErrors.postalCode && (
            <span className="text-red-500">
              {errors.formErrors.fieldErrors.postalCode}
            </span>
          )}

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors?.formErrors?.fieldErrors.weight
                ? "border border-red-500"
                : ""
            }`}
          />
          {errors?.formErrors?.fieldErrors.weight && (
            <span className="text-red-500">
              {errors.formErrors.fieldErrors.weight}
            </span>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              name="donatedPreviously"
              checked={formData.donatedPreviously}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label>Previously Donated?</label>
          </div>

          {formData.donatedPreviously && (
            <>
              <label className="block">Last Donation Date</label>
              <DatePicker
                selected={
                  formData.lastDonation ? new Date(formData.lastDonation) : null
                }
                onChange={(date) => handleDateChange(date, "lastDonation")}
                className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholderText="Select Last Donation Date"
                dateFormat="yyyy-MM-dd"
              />
            </>
          )}

          <textarea
            name="diseases"
            placeholder="Any diseases (optional)"
            value={formData.diseases}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            {userFormStatus === "Add" ? "Add" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInfo;
