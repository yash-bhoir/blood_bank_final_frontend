// src/components/utility/Unauthorized.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate('/signin');
    }, 3000);

    return () => {
      clearInterval(timer); 
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Unauthorized</h2>
        <p className="text-center text-gray-600">
          You must be signed in to access this page. Redirecting to the sign-in page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
