import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import Form from "../components/ui/Form";

export default function SecurityLogin({ onSuccess }) {
  const handleSecurity = (data) => {
    console.log("Security Login Data:", data);
    if (onSuccess) onSuccess(data);
  };

  return (
      <Form
        type="security"
        icon={FaShieldAlt}
        title="Security Login"
        description="Enter the 4-number security OTP to access admin."
        onSubmit={handleSecurity}
      />
  );
}
