import React, { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

export default function ResetPresent() {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all 'Present' and 'Food' fields to empty?"
    );
    if (!confirmReset) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reset_present`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to reset data");

      const data = await response.json();
      alert(data.message || "All 'Present' and 'Food' fields reset successfully!");
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("Failed to reset data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className={`flex items-center cursor-pointer justify-center gap-2 ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
      } text-white font-semibold px-6 py-3 rounded shadow-md transition duration-300`}
    >
      <FaSyncAlt className={`text-lg ${loading ? "animate-spin" : ""}`} />
      {loading ? "Resetting..." : "Reset Present"}
    </button>
  );
}
