import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import type { FormEvent } from "react";
import type { ChangeEvent } from "react";


interface User {
  username: string | null;
  email: string | null;
  password: string | null;
}

export default function RegisterForm () {
  const [userFormData, setUserFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, {error}] = useMutation(SIGN_UP);
  const [validated] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      console.log(userFormData, name, value)
      setUserFormData({ ...userFormData, [name]: value });
    };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  
    try {
  
      const { data } = await signUp({ variables: {...userFormData} });
  
      if (!data) {
        throw new Error("Failed to create account");
      }
  
      console.log('Sign up successful, received data:', data);
  
      Auth.login(data.signUp.token);
      navigate('/');
    } catch (err) {
      console.error('Error during sign up:', err);
      setErrorMessage(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });

  };

  return (
    <Container className="relative d-flex flex-column align-items-center w-100 container" style={{ marginTop: "80px" }}>
      <Card className="card shadow p-4 d-flex w-100 position-relative mt-5">
        <h2 className="text-center mb-4">Create an Account</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Alert
            dismissible
            onClose={() => setErrorMessage(false)}
            show={errorMessage}
            variant="danger"
          >
            Something went wrong with your sign up!
          </Alert>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={userFormData.username || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={userFormData.email || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              name="password"
              value={userFormData.password || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <p className="text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
          
          <div className="d-grid">
            <Button variant="dark" type="submit">Register</Button>
          </div>
        </Form>
      </Card>
            {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </Container>
  );
}
