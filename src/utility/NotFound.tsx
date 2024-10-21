// src/components/utility/NotFound.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearInterval(timer); // Clear the interval if the component is unmounted
      clearTimeout(timeout); // Clear the timeout if the component is unmounted
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Page Not Found</h2>
        <p className="text-center text-gray-600">
          The page you are looking for does not exist. Redirecting to the home page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFound;
