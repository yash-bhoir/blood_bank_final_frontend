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
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Define the props type
interface ResetPasswordProps {
  userId: string; // Specify the type for userId
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ userId }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  console.log("This is prop userId in ResetPassword::", userId);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID is required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });

      if (!response.ok) throw new Error("Failed to reset password");

      const data = await response.json();
      toast.success(data.message || "Password reset successfully");

      // Redirect to sign-in page after success
      navigate("/signin");
    } catch (error) {
      const errorMessage = (error as Error).message || "Error resetting password";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* New Password Input */}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Reset Password Button */}
          <Button type="submit" className="w-full" onClick={handleResetPassword}>
            Reset Password
          </Button>
          <div className="text-sm text-gray-600 text-center mt-4">
            Back to{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
