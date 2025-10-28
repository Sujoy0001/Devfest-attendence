import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { foodqr } from "../../store/FoodStore";
import QrPopup2 from "./QrPopup2";
import QrFrame from "./QrFrame";

export default function QrScanner2({ purpose }) {
  const [scannedText, setScannedText] = useState("");
  const [scannerActive, setScannerActive] = useState(true);
  const { response, loading, scanQr, resetResponse } = foodqr();

  const handleScan = async (results) => {
    if (scannerActive && results.length > 0 && !loading) {
      const text = results[0]?.rawValue;
      setScannedText(text);
      setScannerActive(false);
      await scanQr(text);
      setTimeout(() => handleClosePopup(), 7000);
    }
  };

  const handleClosePopup = () => {
    resetResponse();
    setScannedText("");
    setScannerActive(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 p-8 relative">
      <QrFrame
        active={scannerActive}
        onScan={handleScan}
        scannedText={scannedText}
        loading={loading}
      />

      <AnimatePresence>
        {response && <QrPopup2 response={response} onClose={handleClosePopup} />}
      </AnimatePresence>

      <p className="text-sm italic text-gray-400 mt-4">Food Attendance</p>
    </div>
  );
}
