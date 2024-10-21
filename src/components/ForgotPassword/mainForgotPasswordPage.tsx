import { CarouselDemo } from "@/components/entryHome/Carousel"; // Import CarouselDemo
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const MainForgotPasswordPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen mx-auto">
      <div className="hidden lg:flex lg:flex-1 white items-center justify-center p-4">
        <CarouselDemo />
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-4">
        <div className="w-full lg:w-[500px]">
          <div className="text-center">
             <ForgotPassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForgotPasswordPage;
