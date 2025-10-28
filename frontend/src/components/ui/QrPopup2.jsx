import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

function UserDetail({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center text-base sm:text-lg w-full mb-2 sm:mb-4">
      <span className="text-gray-500">{label}:</span>
      <span className="font-semibold text-gray-800 break-all text-center sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default function QrPopup2({ response, onClose }) {
  if (!response) return null;

  const statusConfig = {
    done: {
      Icon: FaCheckCircle,
      color: "green",
      title: "Food Collected Successfully",
    },
    already_done: {
      Icon: FaExclamationTriangle,
      color: "yellow",
      title: "Food Already Collected",
    },
    error: {
      Icon: FaTimesCircle,
      color: "red",
      title: "Invalid QR Code",
    },
  };

  const currentStatus =
    response.status === "done"
      ? "done"
      : response.status === "already_done"
      ? "already_done"
      : "error";

  const { Icon, color, title } = statusConfig[currentStatus];

  
  const foodType = response.data?.food_preference?.toLowerCase() || "";
  const foodBg =
    foodType === "non-veg"
      ? "bg-gray-100 text-red-700 border-gray-400"
      : foodType === "veg"
      ? "bg-gray-100 text-green-700 border-gray-400"
      : "bg-gray-100 text-gray-700 border-gray-400";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 text-center overflow-y-auto max-h-[90vh]"
        >
       
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-3 right-3 text-gray-700 hover:text-black transition-colors"
            aria-label="Close popup"
          >
            <FaTimes size={24} />
          </button>

          <div
            className={`mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-${color}-100`}
          >
            <Icon className={`text-3xl sm:text-4xl text-${color}-500`} />
          </div>

        
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">
            {title}
          </h2>

      
          <p className="text-sm sm:text-md text-gray-600 mb-4 italic px-2">
            {response.message}
          </p>

      
          {response.data && (
            <div className="space-y-4 sm:space-y-5 border-t pt-4">
              <UserDetail label="Name" value={response.data.name} />
              <UserDetail label="Email" value={response.data.email} />

              <div
                className={`mt-4 border-4 ${foodBg} rounded-xl py-4 flex flex-col items-center justify-center`}
              >
                <span className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
                  {response.data.food_preference}
                </span>
                <span className="text-md sm:text-lg mt-2 font-semibold">
                  Food Preference
                </span>
              </div>
            </div>
          )}

          <div className="w-full mt-5 sm:mt-6">
            <button
              onClick={onClose}
              className="w-full cursor-pointer py-2 sm:py-3 text-lg sm:text-xl font-semibold italic rounded-md bg-black text-white hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
