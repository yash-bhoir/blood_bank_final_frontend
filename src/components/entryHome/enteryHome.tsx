import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "@/components/signin/signin";
import SignUp from "@/components/signup/signup";
import { CarouselDemo } from "@/components/entryHome/Carousel"; // Import CarouselDemo
// import ForgotPassword from "../ForgotPassword/ForgotPassword";

const EntryHome = () => {
  return (
    <div className="flex flex-col lg:flex-row h-auto mx-auto">
      <div className="hidden lg:flex lg:flex-1 white items-center justify-center p-4">
        <CarouselDemo />
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-4">
        <div className="w-full lg:w-[500px]">
          <div className="text-center">
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Navigate to="/signin" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryHome;
