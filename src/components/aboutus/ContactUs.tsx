import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="mt-8 p-6 rounded-lg  text-center">
      <h2 className="text-2xl font-bold mb-4 text-black">Get in Touch</h2>
      <p className="mb-4 text-black">
        If you have any questions, feel free to reach out!
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">
        Contact Us
      </button>

      {/* Social Media Icons */}
      <div className="mt-6 flex justify-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-2xl text-blue-500 hover:text-blue-400" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-2xl text-blue-400 hover:text-blue-300" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-600" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-2xl text-pink-600 hover:text-pink-500" />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
