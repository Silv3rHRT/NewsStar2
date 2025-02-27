import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Alert, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      localStorage.setItem("loginToken", data.token);
      navigate("/");
    } else {
      setErrorMessage("⚠ Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className="relative d-flex flex-column align-items-center w-100 container" style={{ marginTop: "80px" }}>
    <Card className="card shadow p-4 d-flex w-100 position-relative mt-5">
      <h2 className="text-center mb-4">Welcome back!</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <p className="text-center">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
        
        <div className="d-grid">
          <Button variant="dark" onClick={handleLogin}>Login</Button>
        </div>

      </Form>
    </Card>
  </Container>
  );
}
