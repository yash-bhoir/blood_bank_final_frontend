import React from "react";
import Spline from "@splinetool/react-spline";
import NameSection from "./nameSection";
import HomeBottom from "./homebottom";

const MainHome: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Top Section: Left and Right */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-black text-white">
          <NameSection />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-black text-4xl font-bold text-neutral-700 dark:text-neutral-400">
        <Spline scene="https://prod.spline.design/YJ22CVdmlW8DLu1L/scene.splinecode" 

            className="w-full h-full max-w-[700px] max-h-[700px] lg:max-w-[900px] lg:max-h-[900px]"
          />
        </div>
      </div>

      <div className="w-full h-[auto] flex items-center justify-center bg-black ">
        <HomeBottom />
      </div>
    </div>
  );
};

export default MainHome;
