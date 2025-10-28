import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Form from "./ui/Form";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("Login Data:", data);

    if (
      data.email === import.meta.env.VITE_LOGIN_EMAIL &&
      data.password === import.meta.env.VITE_LOGIN_PASS
    ) {
      navigate("/index");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
      <Form
        type="login"
        icon={FaSignInAlt}
        title="User Login"
        description="Enter your email and password to log in."
        onSubmit={handleLogin}
      />
  );
}
