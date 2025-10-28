import React from "react";
import Card from "../components/ui/card";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";

export default function Index() {
    const cards = [
        {
        icon: MdOutlineEventAvailable,
        title: "Enent Attendance",
        description: "Scan your QR to mark attendance.",
        link: "/index/event",
        },
        {
        icon: IoFastFoodOutline,
        title: "Food Attendance",
        description: "Scan your QR to confirm meal.",
        link: "/index/food",
        },
    ];

    return (
        <>  
            <div className="min-h-full">
                <div className="min-h-full w-full flex flex-wrap justify-center items-center gap-6 px-6 py-8 lg:py-18 lg:mt-12">
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
                </div>
            </div>
        </>
    )
}