import React from "react";
import Button from "../components/ui/Buttan";
import { Link } from "react-router-dom";
import { SiTestrail } from "react-icons/si";
import { FiLogOut, FiHome } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineEventAvailable, MdPersonOutline } from "react-icons/md";


export default function Header() {
  const navItems = [
    { text: "Home", icon: FiHome, variant: "default", to: "/index" },
    { text: "Event Attendance", icon: MdOutlineEventAvailable, variant: "default", to: "/index/event" },
    { text: "Food Attendance", icon: IoFastFoodOutline, variant: "default", to: "/index/food" },
    { text: "Admin", icon: MdPersonOutline, variant: "default", to: "/index/admin" },
    { text: "Logout", icon: FiLogOut, variant: "dark", to: "/" },
  ];

  return (
    <div className="max-w-full px-4 lg:px-18 py-4 bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl w-full flex justify-between items-center mx-auto">
            <div className="logo flex items-center justify-center gap-2">
                <SiTestrail className="text-2xl rotate-180 -mr-3" />
                <SiTestrail className="text-2xl" />
                <h2 className="text-2xl font-bold italic">Devfest Attendance</h2>
            </div>
            <div className="hidden lg:block">
              <nav className="flex gap-4">
                  {navItems.map((item, index) => (
                  <Link key={index} to={item.to}>
                      <Button icon={item.icon} text={item.text} variant={item.variant} />
                  </Link>
                  ))}
              </nav>
            </div>
        </div>
    </div>
  );
}