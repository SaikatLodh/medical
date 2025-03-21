"use client";

import { useState } from "react";
import { Home, Calendar, User, Users, FolderGit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/doctoradmin" },
    {
      name: "Appointments",
      icon: <Calendar size={18} />,
      path: "/doctoradmin/appointments",
    },
    {
      name: "Reports",
      icon: <FolderGit size={18} />,
      path: "/doctoradmin/report",
    },
    {
      name: "Patients",
      icon: <Users size={18} />,
      path: "/doctoradmin/patients",
    },
    {
      name: "Profile",
      icon: <User size={18} />,
      path: "/doctoradmin/doctorprofile",
    },
  ];
  return (
    <div>
      <div>
        <div className="flex">
          <aside className="w-56  text-white flex flex-col p-4 ">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.path} passHref>
                  <Button
                    variant={active === item.name ? "secondary" : "ghost"}
                    className={`w-full flex items-center gap-3 justify-start text-lg px-4 py-2 rounded-lg transition-all text-black hover:bg-[#636FFC] hover:text-white cursor-pointer :${
                      active === item.name
                        ? "bg-[#F2F3FF] text-gray-900"
                        : "hover:bg-[#636FFC] hover:text-white"
                    }`}
                    onClick={() => setActive(item.name)}
                  >
                    {item.icon} {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </aside>
          <div className="w-full"> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
