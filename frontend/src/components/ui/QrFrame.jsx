import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QrFrame({ active, onScan, scannedText, loading }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md flex flex-col items-center">
      {active ? (
        <Scanner
          onScan={onScan}
          constraints={{ facingMode: "environment" }}
          components={{ finder: true, audio: false }}
          styles={{
            container: { width: "100%" },
            video: { borderRadius: "12px" },
          }}
        />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center text-gray-500 border-2 border-dashed rounded-lg">
          Scanner paused...
        </div>
      )}

      <p className="mt-4 text-gray-700">
        {loading
          ? "Sending QR data..."
          : scannedText
          ? `Scanned: ${scannedText}`
          : "No result yet"}
      </p>
    </div>
  );
}
