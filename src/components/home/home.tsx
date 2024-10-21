import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/dashboard";
import About from "../aboutus/aboutus";
import Contact from "../contact/contact";
import AddInfo from "../users/addInfo";
import BloodRequest from "../users/bloodRequest";
import RequestStatus from "../users/requestStatus";
import Notification from "../notifictaion/notification";
import { useState } from "react";
import MainHome from "./mainHome";
import BloodDonationAppointment from "../users/bloodDonationAppointment";
import AcceptedRequests from "../dashboard/AcceptedRequests";
import RejectedRequests from "../dashboard/RejectedRequests";
import UserRequests from "../dashboard/UserRequests";
import Users from "../dashboard/Users";

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <MainHome />;
      case "Dashboard":
        return <Dashboard />;
      case "About":
        return <About />;
      case "Contact":
        return <Contact />;
      case "AddInfo":
        return <AddInfo />;
      case "RequestBlood":
        return <BloodRequest />;
      case "BloodDonationAppointment":
        return <BloodDonationAppointment />;
      case "RequestStatus":
        return <RequestStatus />;
      case "Notification":
        return <Notification />;
      case "AcceptedRequests":
        return <AcceptedRequests />;
      case "RejectedRequests":
        return <RejectedRequests />;
      case "UserRequests":
        return <UserRequests />;
      case "Users":
        return <Users />;
      default:
        return <h2>Welcome to My Website</h2>;
    }
  };

  return (
    <div className="bg-[white] px-4 h-[auto]">
      <div className="border-b border-white mt-3">
        <Navbar onSelect={setSelectedComponent} />
      </div>
      <main className="">{renderComponent()}</main>
    </div>
  );
};

export default Home;
