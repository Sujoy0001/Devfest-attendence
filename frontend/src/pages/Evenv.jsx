import React from "react";
import QrScanner from "../components/ui/QrScanner";
import Back from "../components/ui/Back"; 

export default function Event() {
    return (
        <>
            <Back title="Event Attendance page" subtitle="Mark your presence quickly by scanning your event QR code." />
            <div className="p-0">
                <QrScanner />
            </div>
        </>
    )
}