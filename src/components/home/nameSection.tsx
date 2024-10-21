import React from "react";
import AuroraEffect from "./auraeffect";
import FlipWordsDemo from "./skillsSectionTopLeft";


const NameSection: React.FC = () => {
  return (
    <div className="text-center flex-1 py-5 mx-6">
      <div className="text-start">
        <div>
        <AuroraEffect/>
        </div>
        <FlipWordsDemo/>
        </div>
    </div>
  );
};

export default NameSection;
