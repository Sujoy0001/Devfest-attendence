import React from "react";
import { FaDownload } from "react-icons/fa";

export default function DownloadCSV() {
  const handleDownloadCSV = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/download_csv`);
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv"; // File name
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Failed to download CSV file. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDownloadCSV}
      className="flex items-center cursor-pointer justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-300"
    >
      <FaDownload className="text-lg" />
      Download CSV
    </button>
  );
}
