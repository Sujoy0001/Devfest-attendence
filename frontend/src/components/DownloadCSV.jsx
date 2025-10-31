import React, { useState } from "react";
import { FaDownload, FaSpinner } from "react-icons/fa";

export default function DownloadCSV() {
  const [loading, setLoading] = useState(false);

  const handleDownloadCSV = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/download_csv`);
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "attendance.csv"; // File name
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("❌ Failed to download CSV file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownloadCSV}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold shadow-md transition duration-300 
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}
      `}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin text-lg" />
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <FaDownload className="text-lg" />
          <span>Download CSV</span>
        </>
      )}
    </button>
  );
}
