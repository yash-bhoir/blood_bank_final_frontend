import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Verifying OTP: ${otp}`);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
        <CardDescription>
          Enter the OTP sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* OTP Input */}
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyOtp;
