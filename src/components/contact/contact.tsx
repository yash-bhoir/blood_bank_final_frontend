import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-8 bg-black text-white">
      {/* Left Section */}
      <div className="md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-300 p-8 rounded-xl shadow-lg md:mr-8 h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
        <p className="mb-2">
          <strong>Visit us</strong>
          <br />
          Come say hello at our office HQ.
          <br />
          67 Wiltshire Way Croydon South VIC 3136 AU
        </p>
        <p className="mb-2">
          <strong>Chat to us</strong>
          <br />
          Our friendly team is here to help.
          <br />
          hello@psyphere.com
        </p>
        <p className="mb-2">
          <strong>Call us</strong>
          <br />
          Mon-Fri from 8am to 5pm
          <br />
          (+995) 555-65-65-55
        </p>
        <div className="mt-4 flex space-x-4">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 p-8 bg-gray-900 rounded-xl shadow-lg md:ml-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="message"
            placeholder="Tell us what we can help you with"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          ></textarea>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="privacy" required />
            <label htmlFor="privacy">
              I’d like to receive more information about the company. I understand and agree to the{" "}
              <a href="#" className="text-blue-400 underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
