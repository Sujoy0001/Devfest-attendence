import React from "react";
import { Link } from "react-router-dom";

export default function Card({ icon: Icon, title, description, link }) {
  return (
    <div className="bg-white text-black rounded shadow-lg p-6 flex flex-col items-center gap-4 w-full max-w-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {Icon && (
        <div className="p-4 bg-gray-50 rounded-full border border-gray-200">
          <Icon className="text-2xl text-black" />
        </div>
      )}
      
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="italic leading-relaxed text-sm">
          {description}
        </p>
      </div>

      <Link
        to={link}
        className="mt-6 px-6 py-3 bg-black text-white hover:text-yellow-500 rounded transition-all duration-300 font-medium text-sm hover:shadow-md w-full text-center"
      >
        Get Started
      </Link>
    </div>
  );
}