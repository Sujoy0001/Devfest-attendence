import React, { useState } from "react";
import DownloadCSV from "../components/DownloadCSV";
import ResetPresent from "../components/ResetPresent";
import SecurityLogin from "../components/SecurityLogin";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);

  const handleSecuritySuccess = (data) => {
    console.log("Security Access Granted:", data);
    setAuthorized(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-18">
        {!authorized ? (
          <SecurityLogin onSuccess={handleSecuritySuccess} />
        ) : (
          <div className="w-full max-w-6xl p-8 text-center">
            
            <div>
              <h1 className="text-4xl font-bold">
                Admin Dashboard
              </h1>
              <p className="mt-2">
                Manage event data and perform administrative actions from here.
              </p>
            </div>

            <div className="mt-8 flex gap-6 p-4">
              
              <div className="bg-white p-6 rounded-lg text-left">
                <h2 className="text-2xl font-bold">Download Attendee Data</h2>
                <p className="mt-1 text-md">
                  Click the button to download a full CSV report of all registered attendees. This includes their name, email, attendance status, and other details.
                </p>
                <div className="mt-4 flex justify-end">
                  <DownloadCSV />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg text-left">
                <h2 className="text-2xl font-bold">Reset All Attendance</h2>
                 <p className="mt-1 text-md">
                  This is a critical action. It will reset the 'Present' and 'Food' status for all attendees to 'false'. Only use this before starting a new check-in session for an event.
                </p>
                <div className="mt-4 flex justify-end">
                  <ResetPresent />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}