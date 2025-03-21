"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  const isFooter =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/doctoradmin");
  return (
    <>
      {!isFooter && (
        <footer className="bg-white py-10 border-t">
          <div className="container mx-auto flex flex-col md:flex-row justify-between px-6">
            {/* Left Section */}
            <div className="md:w-1/3">
              <div className="flex items-center space-x-2">
                <Image src={logo} alt="Logo" width={200} height={30} />
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>

            {/* Middle Section */}
            <div className="md:w-1/3 text-center">
              <h4 className="text-md font-semibold text-gray-900">COMPANY</h4>
              <ul className="mt-2 space-y-2 text-gray-600 text-sm ">
                <li>
                  <Link href="/home">Home</Link>
                </li>
                <li>
                  <Link href="/doctors">All Doctors</Link>
                </li>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact us</Link>
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="md:w-1/3">
              <h4 className="text-md font-semibold text-gray-900">
                GET IN TOUCH
              </h4>
              <p className="mt-2 text-gray-600 text-sm">+1-212-456-7890</p>
              <p className="text-gray-600 text-sm">greatstackdev@gmail.com</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="text-center text-gray-500 text-sm mt-10 border-t pt-4">
            Copyright © 2024 GreatStack - All Right Reserved.
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
