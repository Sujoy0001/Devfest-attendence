import React from "react";

export default function Button({ onClick, text, icon: Icon, variant = "default" }) {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-md transition text-sm font-medium cursor-pointer";

  const variants = {
    default: "bg-white text-black border border-gray-300 hover:bg-gray-100",
    dark: "bg-black text-white hover:bg-gray-900",
    delete: "bg-red-500/80 border border-red-500 hover:bg-red-500"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.default}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {text}
    </button>
  );
}