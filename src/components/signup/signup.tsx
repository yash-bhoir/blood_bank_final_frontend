import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Popup from "@/utility/Popup";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {

                setPopupMessage("user created successfully");
                setShowPopup(true);
                setTimeout(() => {
                    navigate("/signin");
                  }, 2000); 

            } else {
                const errorData = await response.json();
                setError(errorData.message || "An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    const closePopup = () => {
        setShowPopup(false);
      };

    return (
        <Card className="mx-auto max-w-sm">
                  {showPopup && <Popup message={popupMessage} onClose={closePopup} />}

            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                <CardDescription>
                    Create your account by filling out the form below
                </CardDescription>
            </CardHeader>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <CardContent>
                    <div className="space-y-2">
                        {/* Username Input */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Error Message */}
                        {error && <div className="text-red-500">{error}</div>}

                        {/* Sign Up Button */}
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>

                        {/* Sign Up with Google Button */}
                        <Button className="w-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center mt-4 hover:bg-gray-100">
                            <FcGoogle className="mr-2" size={24} />
                            Sign Up with Google
                        </Button>

                        {/* Already Have an Account? Link */}
                        <div className="text-sm text-gray-600 text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-blue-600 hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};

export default SignUp;
