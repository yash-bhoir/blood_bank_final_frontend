import React from 'react';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const SocialIcons: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 mb-6 mt-10 items-start">
      <FaEnvelope className="text-2xl" />
      <FaLinkedin className="text-2xl" />
      <FaGithub className="text-2xl" />
      <FaInstagram className="text-2xl" />
      <FaTwitter className="text-2xl" />
    </div>
  );
};

export default SocialIcons;
