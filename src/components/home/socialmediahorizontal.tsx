import React from 'react';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const SocialIconsH: React.FC = () => {
  return (
    <div className="flex space-x-4 mb-6 mt-10">
      <FaEnvelope className="text-2xl" />
      <FaLinkedin className="text-2xl" />
      <FaGithub className="text-2xl" />
      <FaInstagram className="text-2xl" />
      <FaTwitter className="text-2xl" />
    </div>
  );
};

export default SocialIconsH;
