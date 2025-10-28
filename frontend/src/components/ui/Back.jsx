import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./Buttan";

const Back = ({ title, subtitle, link }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-full bg-white text-black p-4">
      <div className="max-w-7xl w-full flex items-center gap-8 mx-auto">
        <Button onClick={() => navigate(-1)} icon={FaArrowLeft} text="Back" variant="default" />

        <div className="hidden md:block">
          <div className="flex flex-col items-left w-full">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-md italic">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Back;