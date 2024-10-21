import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [userId, setUserId] = useState<string | null>(null); 
  const navigate = useNavigate(); 

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("api/v1/users/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId: email }),
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      const data = await response.json();
      toast.success(data.message);
      setOtpSent(true);
    } catch (error) {
      const errorMessage = (error as Error).message || "Error sending OTP";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const otpAsInt = parseInt(otp, 10);
    if (isNaN(otpAsInt)) {
      toast.error("Please enter a valid OTP");
      return;
    }
  
    try {
      const response = await fetch("/api/v1/users/validateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId: email, otp: otpAsInt }),
      });
  
      if (!response.ok) throw new Error("Invalid OTP");
  
      const data = await response.json();
      const receivedUserId = data.data.id; // Extract the userId from the response
      toast.success(data.message);
  
      console.log("validate otp response ::", receivedUserId);
      // setUserId(receivedUserId); // Set the userId state
  
      // Directly navigate using the userId
      navigate("/resetPassword", { state: { userId: receivedUserId } });
    } catch (error) {
      const errorMessage = (error as Error).message || "Error validating OTP";
      toast.error(errorMessage);
    }
  };  

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive an OTP for password reset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                type="button"
                className="w-full"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Send OTP"}
              </Button>

              <div className="text-sm text-gray-600 text-center mt-4">
                Back to{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={handleValidateOtp}
              >
                Validate OTP
              </Button>

              <div className="text-sm text-gray-600 text-center mt-4">
                Back to{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
