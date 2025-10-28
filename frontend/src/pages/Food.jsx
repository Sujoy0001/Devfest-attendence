import React from "react";
import QrScanner2 from "../components/ui/QrScanner2";
import Back from "../components/ui/Back"; 

export default function Food() {
    return (
        <>
            <Back title="Food Attendance page" subtitle="Confirm your meal by scanning your food QR code." />
            <div className="p-0">
                <QrScanner2 />
            </div>
        </>
    )
}