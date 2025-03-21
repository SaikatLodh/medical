"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { signout } from "@/apis/user/signout";
import { useAppContext } from "@/context/Contaxt";
import { createClient } from "@/utils/supabase/client";
import { User } from "@/type/type";

const Navbar = () => {
  const { user } = useAppContext();
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const [authorized, setAuthorized] = useState(null);
  const [getDetails, setDetails] = useState<User | null>(null);
  const handleClick = () => {
    setOpen(false);
  };

  const logout = () => {
    signout()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: authUser } = await supabase.auth.getUser();
      if (authUser.user) {
        setAuthorized(authUser?.user?.user_metadata?.role);
      }

      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", authUser?.user?.id)
        .single();

      setDetails(data);
    };
    getUser();
  });

  return (
    <>
      {user && (
        <nav className="flex items-center justify-between px-6 py-4 shadow-sm border-b bg-white">
          {/* Logo */}
          <Link href="/home">
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" width={150} height={30} />
            </div>
          </Link>
          {/* Navigation Links */}
          {authorized === "Patient" && (
            <div className="hidden md:flex space-x-6 text-gray-700 text-sm font-bold">
              <Link href="/home" className="hover:text-blue-600">
                HOME
              </Link>
              <Link href="/doctors" className="hover:text-blue-600">
                ALL DOCTORS
              </Link>
              <Link href="/about" className="hover:text-blue-600">
                ABOUT
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                CONTACT
              </Link>
            </div>
          )}
          <div className="flex  gap-2 p-2 ">
            {authorized === "Patient" ? (
              <img
                src={`https://xizsjccgaozooylljaop.supabase.co/storage/v1/object/public/${getDetails?.profilepic}`}
                alt={authorized}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <h4 className="font-bold text-[18px]">{authorized}</h4>
            )}
            <span
              onClick={() => setOpen(!open)}
              className="cursor-pointer pl-3"
            >
              ▼
            </span>
          </div>
          {open && (
            <div className="absolute right-20 top-15 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
              {authorized === "Patient" && (
                <Link href="/getprofile">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClick}
                  >
                    My Profile
                  </button>
                </Link>
              )}

              {authorized === "Patient" && (
                <Link href="/getallappointments">
                  {" "}
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClick}
                  >
                    My Appointments
                  </button>
                </Link>
              )}

              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
