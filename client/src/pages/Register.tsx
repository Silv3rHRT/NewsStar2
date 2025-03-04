import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (username: string, password: string, email: string) => {
    
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } else {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="w-screen mt-[300px] flex items-center justify-center">
      <RegisterForm  />
    </div>
  );
}
