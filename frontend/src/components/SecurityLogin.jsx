import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import Form from "../components/ui/Form";

export default function SecurityLogin({ onSuccess }) {
  const handleSecurity = (data) => {
    const enteredOTP = data?.otp?.trim();
    const correctOTP = import.meta.env.VITE_SECURITY_OTP;

    if (enteredOTP === correctOTP) {
      console.log("Security access granted");
      if (onSuccess) onSuccess(data);
    } else {
      alert("Invalid security OTP. Access denied.");
    }
  };

  return (
    <Form
      type="security"
      icon={FaShieldAlt}
      title="Security Login"
      description="Enter the 4-digit security OTP to access admin."
      onSubmit={handleSecurity}
    />
  );
}
