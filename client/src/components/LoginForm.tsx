import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Alert, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function LoginForm() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(userFormData, name, value)
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({ variables: { ...userFormData } });

      Auth.login(data.login.token);
      navigate('/');
    } catch (e) {
      console.error(e);
      setShowAlert(true);
      setErrorMessage("Login failed. Please try again.");
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
    <Container className="relative d-flex flex-column align-items-center w-100 container" style={{ marginTop: "80px" }}>
      <Card className="card shadow p-4 d-flex w-100 position-relative mt-5">
        <h2 className="text-center mb-4">Welcome back!</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email || ""}              
              required
            />
            <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={userFormData.password || ""}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
            Password is required!
            </Form.Control.Feedback>
          </Form.Group>
          
          <p className="text-center">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
          
          <div className="d-grid">
            <Button 
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
            >
              Login
            </Button>
          </div>
        </Form>
      </Card>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </Container>
    </>
  );
}
