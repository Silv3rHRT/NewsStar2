import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("⚠ Please enter your username and password.");
      return;
    }

    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
      const data = await response.json();

    if (response.ok) {
      localStorage.setItem("loginToken", data.token)
      navigate("/");
    } else {
      setErrorMessage("⚠ Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative z-50">
      <h2 className="text-5xl font-fjalla text-center text-gray-900 mb-6">Welcome back!</h2>

      <div className="flex flex-col gap-6">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>

        <div className="flex items-center justify-center mt-4">
          <Button onClick={handleLogin} className="bg-gray-900 hover:bg-gray-400 hover:text-gray-900 w-1/2 font-fjalla">Login</Button>
        </div>
      </div>
    </div>
  );
}
