import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Import social media icons

const HomeBottom = () => {
  return (
    <div className="text-center mt-8 px-10 ">
      <div>
        <p className="text-md text-neutral-600 text-white mt-10">
          Revolutionizing <span className="text-blue-500">emergency healthcare</span> by providing
          <span className="text-blue-500"> rapid</span>, 
          <span className="text-blue-500"> reliable</span> blood transportation using
          <span className="text-blue-500"> cutting-edge drone technology</span>.
          Our service ensures critical supplies reach even the most remote locations within minutes,
          <span className="text-blue-500"> saving lives</span> when every second counts.
        </p>

        <p className="text-lg text-center text-neutral-600 text-white mt-5">
          <span className="text-red-500">Emergency</span>? We’ve got you covered.
        </p>
      </div>

      <div className="flex gap-4 mt-10 justify-center">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2]">
          <FaFacebook size={30} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2]">
          <FaTwitter size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F]">
          <FaInstagram size={30} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#0077B5]">
          <FaLinkedin size={30} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000]">
          <FaYoutube size={30} />
        </a>
      </div>

      <button className="p-[1px] relative mt-[30px] mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          Contact Us
        </div>
      </button>
    </div>
  );
};

export default HomeBottom;
