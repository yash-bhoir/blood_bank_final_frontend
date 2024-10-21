import { useEffect, useState } from "react";
import {
  HomeIcon,
  InformationCircleIcon,
  BellIcon,
  UserIcon,
  Bars3Icon,
  ChartBarIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import logo from "../../assets/logo.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import decryptToken from "@/utility/decryptToken";


interface NavbarProps {
  onSelect: (component: string) => void; // Prop for selecting components
}

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const navigate = useNavigate();

  const handleSelect = (component: string) => {
    onSelect(component);
    setMenuOpen(false); // Close menu on selection
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = decryptToken();
      const role = userInfo?.role;
  
      console.log("this is role ", role);
      if (role === 'Admin') {
        setIsAdmin(true);
        toast.success(`Welcome Admin ${userInfo?.username}`);
      } else if (role === 'User') {
        setIsAdmin(false);
        toast.success(`Welcome User ${userInfo?.username}`);
      } else {
        toast.error("User has no role.");
      }
    };
  
    fetchData();
  }, []);
  

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5173/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('IsAuthenticated', { secure: true, sameSite: 'Strict' });
        Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });

        navigate('/signin');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  return (
    <nav className="bg-black rounded-t-xl mx-auto">
      <ToastContainer />
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logo} alt="Drono Phaeton Logo" className="h-10 w-auto" />
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {/* Home */}
          <span
            onClick={() => handleSelect("Home")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <HomeIcon className="h-4 w-4 mr-1" />
            <span>Home</span>
          </span>

          {/* Dashboard Dropdown */}
          {isAdmin &&
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center text-white hover:text-[#ff4d00] cursor-pointer">
                  <ChartBarIcon className="h-4 w-4 mr-1" />
                  <span>Dashboard</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg">
                <DropdownMenuItem onClick={() => handleSelect("UserRequests")}>
                  User Requests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelect("AcceptedRequests")}>
                  Accepted Requests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelect("RejectedRequests")}>
                  Rejected Requests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelect("Users")}>
                  Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          {/* About Us */}
          <span
            onClick={() => handleSelect("About")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <InformationCircleIcon className="h-4 w-4 mr-1" />
            <span>About Us</span>
          </span>

          {/* Contact */}
          <span
            onClick={() => handleSelect("Contact")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <PhoneIcon className="h-4 w-4 mr-1" />
            <span>Contact</span>
          </span>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center text-white hover:text-[#ff4d00] cursor-pointer">
                <UserIcon className="h-4 w-4 mr-1" />
                <span>User</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-lg">
              <DropdownMenuItem onClick={() => handleSelect("AddInfo")}>
                Add Information
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("RequestBlood")}>
                Request Blood
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("BloodDonationAppointment")}>
                Donate Blood
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("RequestStatus")}>
                Request Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-3">
          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="text-[#eaeaea] hover:text-[#ff4d00] p-1 bg-[#161819] rounded-md hover:bg-[#333739] cursor-pointer">
                <UserIcon className="h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-lg">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}

              >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <button className="text-[#eaeaea] hover:text-[#ff4d00] p-1 bg-[#161819] rounded-md hover:bg-[#333739]">
            <BellIcon className="h-5 w-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#eaeaea] hover:text-[#ff4d00] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black py-4 px-6 space-y-4 shadow-lg">
          <span
            onClick={() => handleSelect("Home")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            <span>Home</span>
          </span>
          <span
            onClick={() => handleSelect("Dashboard")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            <span>Dashboard</span>
          </span>
          <span
            onClick={() => handleSelect("About")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <InformationCircleIcon className="h-4 w-4 mr-2" />
            <span>About Us</span>
          </span>
          <span
            onClick={() => handleSelect("Contact")}
            className="flex items-center cursor-pointer text-white hover:text-[#ff4d00] text-sm"
          >
            <PhoneIcon className="h-4 w-4 mr-2" />
            <span>Contact</span>
          </span>

          {/* User Dropdown in Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center text-white hover:text-[#ff4d00] cursor-pointer">
                <UserIcon className="h-4 w-4 mr-2" />
                <span>User</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-lg">
              <DropdownMenuItem onClick={() => handleSelect("AddInfo")}>
                Add Information
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("RequestBlood")}>
                Request Blood
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("DonateBlood")}>
                Donate Blood
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("RequestStatus")}>
                Request Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
