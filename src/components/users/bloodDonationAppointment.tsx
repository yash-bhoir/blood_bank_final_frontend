import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import decryptToken from "@/utility/decryptToken";

interface FormData {
  userId: string;
  bloodTypeId: string;
  appointment_date: string | null;
  appointment_time: string | null;
  hospital_name: string;
  contact_number: string;
  is_fast: boolean;
}

const BloodDonationAppointment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    bloodTypeId: "",
    appointment_date: null,
    appointment_time: null,
    hospital_name: "",
    contact_number: "",
    is_fast: false,
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
      "appointment_date",
      "appointment_time",
      "hospital_name",
      "contact_number",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())} is required`;
      }
    });

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
    };

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5173/api/v1/blooddonation/appointment",
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
        throw new Error(data.message || "Failed to create blood donation appointment");
      }

      toast.success(data.message || "Appointment successfully created");

      // Reset form
      setFormData({
        userId: decodedUserId,
        bloodTypeId: "",
        appointment_date: null,
        appointment_time: null,
        hospital_name: "",
        contact_number: "",
        is_fast: false,
      });
    } catch (error) {
      console.error("Error creating blood donation appointment:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while creating the appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black text-white min-h-screen">
      <ToastContainer />
      <div className="w-full md:w-1/2 p-8 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-9 text-center">
          Blood Donation Appointment Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
   
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

          {/* Appointment Date */}
          <DatePicker
            selected={
              formData.appointment_date
                ? new Date(formData.appointment_date)
                : null
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                appointment_date: date ? date.toISOString() : null,
              })
            }
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.appointment_date ? "border border-red-500" : ""
            }`}
            placeholderText="Appointment Date"
            dateFormat="yyyy-MM-dd"
            aria-label="Appointment Date"
          />
          {errors.appointment_date && (
            <span className="text-red-500">{errors.appointment_date}</span>
          )}

          {/* Appointment Time */}
          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time ?? ""}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.appointment_time ? "border border-red-500" : ""
            }`}
            aria-label="Appointment Time"
          />
          {errors.appointment_time && (
            <span className="text-red-500">{errors.appointment_time}</span>
          )}

          {/* Hospital Name */}
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

          {/* Contact Number */}
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

          {/* Fast Donation Checkbox */}
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_fast"
              checked={formData.is_fast}
              onChange={handleChange}
              className="mr-2"
              aria-label="Fast Donation"
            />
            Fast Donation (Quick Process)
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white bg-blue-500 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Submitting..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodDonationAppointment;
