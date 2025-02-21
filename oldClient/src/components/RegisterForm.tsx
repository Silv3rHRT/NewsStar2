import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  onRegister: (username: string, password: string, email: string) => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setErrorMessage("⚠ Please fill out all fields.");
      return;
    }
    onRegister(username, password, email);
  };

  return (
    <div className="w-full flex items-start justify-center pb-[50px]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-5xl font-fjalla text-center text-gray-900 mb-6">Create an Account</h2>

        <div className="flex flex-col gap-6">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          {errorMessage && (
            <div className="bg-pink-100 text-red-600 px-4 py-2 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>

          <div className="flex items-center justify-center mt-4">
            <Button type="submit" className="bg-gray-900 hover:bg-gray-400 hover:text-gray-900 w-1/2 font-fjalla" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}