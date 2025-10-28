import React, { useState } from "react";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import Button from "./Buttan";

export default function Form({
  title,
  description,
  type = "login", // "login" or "security"
  envEmail,
  envPass,
  envOtp,
  onSubmit,
}) {
  const [email, setEmail] = useState(envEmail || "");
  const [password, setPassword] = useState(envPass || "");
  const [otp, setOtp] = useState(envOtp || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "login") {
      onSubmit?.({ email, password });
    } else {
      onSubmit?.({ otp });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-md bg-white shadow-xl rounded-2xl py-8 px-8">
        <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
        <p className="text-center mb-8">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {type === "login" ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring- focus:ring-black"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute text-gray-500 left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* OTP */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Security Code
                </label>
                <div className="relative">
                  <FaKey className="absolute left-3 top-3" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-black uppercase tracking-widest"
                    placeholder="Enter 4-number code"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="mt-4 w-full cursor-pointer bg-black text-white font-semibold py-2 rounded transition-all"
          >
            {type === "login" ? "Login" : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
