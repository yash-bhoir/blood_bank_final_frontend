import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import decryptToken from "@/utility/decryptToken";

interface FormData {
  userId: string;
  bloodTypeId: string;
  quantity: number;
  request_date: string | null;
  required_by: string | null;
  delivery_address: string;
  contact_number: string;
  reason_for_request: string;
  hospital_name: string;
  urgent: boolean;
}

const BloodRequest: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    bloodTypeId: "",
    quantity: 0,
    request_date: null,
    required_by: null,
    delivery_address: "",
    contact_number: "",
    reason_for_request: "",
    hospital_name: "",
    urgent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const requiredFields: (keyof FormData)[] = [
      "bloodTypeId",
      "quantity",
      "request_date",
      "required_by",
      "delivery_address",
      "contact_number",
      "reason_for_request",
      "hospital_name",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())} is required`;
      }
    });

    // Specific validation for fields
    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(formData.contact_number)) {
      newErrors.contact_number = "Invalid contact number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = decryptToken();
    const decodedUserId = userInfo?._id || "";

    const updatedFormData = {
      ...formData,
      userId: decodedUserId,
      quantity: Number(formData.quantity),
    };

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5173/api/v1/bloodrequest/blood-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create blood request");
      }

      toast.success(data.message || "Request successfully created");

      setFormData({
        userId: decodedUserId,
        bloodTypeId: "",
        quantity: 0,
        request_date: null,
        required_by: null,
        delivery_address: "",
        contact_number: "",
        reason_for_request: "",
        hospital_name: "",
        urgent: false,
      });
    } catch (error) {
      console.error("Error creating blood request:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while creating the request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black text-white min-h-screen">
      <ToastContainer />
      <div className="w-full md:w-1/2 p-8 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Blood Request Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="bloodTypeId" className="block mb-2">
            Select Blood Group
          </label>
          <select
            id="bloodTypeId"
            name="bloodTypeId"
            value={formData.bloodTypeId}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.bloodTypeId ? "border border-red-500" : ""
            }`}
            aria-label="Select Blood Group"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {/* Add backend bloodTypeId values */}
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.bloodTypeId && (
            <span className="text-red-500">{errors.bloodTypeId}</span>
          )}

          {/* Rest of your form fields */}
          {/* Example for quantity */}
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.quantity ? "border border-red-500" : ""
            }`}
            aria-label="Quantity"
          />
          {errors.quantity && (
            <span className="text-red-500">{errors.quantity}</span>
          )}

          <DatePicker
            selected={
              formData.request_date ? new Date(formData.request_date) : null
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                request_date: date ? date.toISOString() : null,
              })
            }
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.request_date ? "border border-red-500" : ""
            }`}
            placeholderText="Request Date"
            dateFormat="yyyy-MM-dd"
            aria-label="Request Date"
          />
          {errors.request_date && (
            <span className="text-red-500">{errors.request_date}</span>
          )}

          <input
            type="text"
            name="required_by"
            placeholder="Required By"
            value={formData.required_by ?? ""}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.required_by ? "border border-red-500" : ""
            }`}
            aria-label="Required By"
          />
          {errors.required_by && (
            <span className="text-red-500">{errors.required_by}</span>
          )}

          <textarea
            name="delivery_address"
            placeholder="Delivery Address"
            value={formData.delivery_address}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.delivery_address ? "border border-red-500" : ""
            }`}
            rows={3}
            aria-label="Delivery Address"
          />
          {errors.delivery_address && (
            <span className="text-red-500">{errors.delivery_address}</span>
          )}

          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.contact_number ? "border border-red-500" : ""
            }`}
            aria-label="Contact Number"
          />
          {errors.contact_number && (
            <span className="text-red-500">{errors.contact_number}</span>
          )}

          <textarea
            name="reason_for_request"
            placeholder="Reason for Request"
            value={formData.reason_for_request}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.reason_for_request ? "border border-red-500" : ""
            }`}
            rows={3}
            aria-label="Reason for Request"
          />
          {errors.reason_for_request && (
            <span className="text-red-500">{errors.reason_for_request}</span>
          )}

          <input
            type="text"
            name="hospital_name"
            placeholder="Hospital Name"
            value={formData.hospital_name}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.hospital_name ? "border border-red-500" : ""
            }`}
            aria-label="Hospital Name"
          />
          {errors.hospital_name && (
            <span className="text-red-500">{errors.hospital_name}</span>
          )}

          <label className="flex items-center">
            <input
              type="checkbox"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
              className="mr-2"
              aria-label="Urgent Request"
            />
            Urgent Request
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white bg-blue-500 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodRequest;
