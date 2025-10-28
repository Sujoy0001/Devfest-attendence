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
    <div className="flex flex-col sm:flex-row sm:justify-between items-center text-base sm:text-lg w-full mb-2 sm:mb-4">
      <span className="text-gray-500">{label}:</span>
      <span className="font-semibold text-gray-800 break-all text-center sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default function QrPopup({ response, onClose }) {
  if (!response) return null;

  const statusConfig = {
    found: {
      Icon: FaCheckCircle,
      color: "green",
      title: "Attendance Marked",
    },
    already_present: {
      Icon: FaExclamationTriangle,
      color: "yellow",
      title: "Already Marked Present",
    },
    error: {
      Icon: FaTimesCircle,
      color: "red",
      title: "Invalid QR Code",
    },
  };

  const currentStatus =
    response.status === "found"
      ? "found"
      : response.status === "already_present"
      ? "already_present"
      : "error";

  const { Icon, color, title } = statusConfig[currentStatus];

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

          <div className="space-y-3 sm:space-y-4 border-t pt-4">
            {currentStatus === "found" && (
              <>
                <div className="space-y-2 sm:space-y-3">
                  <UserDetail label="Name" value={response.data.name} />
                  <UserDetail label="Email" value={response.data.email} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <div className="flex-1 bg-gray-100 p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {response.data.food_preference}
                    </span>
                    <span className="text-sm sm:text-md text-gray-600 mt-1">
                      Food
                    </span>
                  </div>

                  <div className="flex-1 bg-gray-100 p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {response.data.t_shirt_size}
                    </span>
                    <span className="text-sm sm:text-md text-gray-600 mt-1">
                      T-Shirt
                    </span>
                  </div>
                </div>
              </>
            )}

            {currentStatus === "already_present" && (
              <div className="space-y-2 sm:space-y-3">
                <UserDetail label="Name" value={response.data.name} />
                <UserDetail label="Email" value={response.data.email} />
              </div>
            )}

            {currentStatus === "error" && (
              <p className="text-red-600 font-medium text-sm sm:text-base">
                {response?.error || "This QR code could not be found."}
              </p>
            )}
          </div>

          <div className="w-full mt-5">
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
