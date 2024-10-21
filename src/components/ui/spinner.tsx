// src/components/ui/spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-current border-t-transparent" />
      <style>
        {`
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .spinner-border {
            width: 1.5rem;
            height: 1.5rem;
            border-width: 0.25em;
            border-radius: 50%;
            animation: spin 0.75s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
