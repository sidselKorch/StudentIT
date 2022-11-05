
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  InputGroup,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import { render } from "react-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser() {
    const user = {
      password: password,
      id: email,
    };
    try {
      //let response = await axios.put(baseURL, user);
      //let userInfo = await axios.get(baseURL + "/" + email);
      //console.log(userInfo.data.userInformation.email);
      //localStorage.setItem(
      //  "user",
      //  JSON.stringify(userInfo.data.userInformation)
      //);
      alert("Successfully logged in");
      //change to home path
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }

    //localStorage.setItem('user', JSON.stringify(response));
  }
  return (
    <div className="col-sm-6 offset-sm-3">
      <h1>Login Page</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="Password"
      />
      <br />
      <button onClick={loginUser} className="btn btn-primary">
        Login
      </button>

      <br />
      <Link to="/register">
        <p>Register</p>
      </Link>
    </div>
  );
}

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //const navigate = useNavigate();

  async function signUp() {
    const user = {
      firstName: firstName,
      familyName: familyName,
      password: password,
      id: email,
    };
    //let response = await axios.post(baseURL, user);
    //if (response.status === 200) {
    //  window.location.href = "/";
    //} else {
    //  alert("Email already exists");
    //}
    //response = await response;
    //localStorage.setItem("user", JSON.stringify(user));
    console.log(localStorage.getItem("user"));
    window.location.href = "/";
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="col-sm-6 offset-sm-3">
        <h1>Register Page</h1>
        <Form.Group className="mb-4" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Enter your first name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFamilyName">
          <Form.Label>Family Name</Form.Label>
          <Form.Control
            required
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            type="text"
            placeholder="Enter your last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose an email.
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Text className="text-muted">
            Your email requires at least one alphanumeric character before @
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">*</InputGroup.Text>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <button onClick={signUp} type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </Form>
  );
}
