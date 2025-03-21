"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/apis/user/getuser";
import { User } from "@/type/type";
const GetUserDetails = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <>
      <section className="container mx-auto py-6 px-6 max-w-md">
        <Card className="p-6 shadow-md rounded-lg">
          <CardContent>
            <div className="flex items-center gap-4">
              {user?.profilepic ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${user?.profilepic}`}
                  alt="User Profile"
                  className="rounded-full w-16 h-16 object-cover"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                  alt="Placeholder"
                  width={80}
                  height={80}
                  className="rounded-full bg-gray-200"
                />
              )}
            </div>

            <h2 className="text-xl font-semibold mt-4">{user?.fullname}</h2>

            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                CONTACT INFORMATION
              </h3>
              <p className="text-sm text-gray-600">
                Email id:{" "}
                <Link
                  href="mailto:richardjameswap@gmail.com"
                  className="text-blue-600"
                >
                  {user?.email}
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Phone:{" "}
                <Link href="tel:+11234567890" className="text-blue-600">
                  {user?.phone}
                </Link>
              </p>
              <p className="text-sm text-gray-600">{user?.address}</p>
            </div>

            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                BASIC INFORMATION
              </h3>
              <p className="text-sm text-gray-600">{user?.gender}</p>
              <p className="text-sm text-gray-600">{user?.birthday}</p>
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                href="/adduserdetails
              "
              >
                <Button variant="outline" className="cursor-pointer">
                  Add
                </Button>
              </Link>
              <Link href="/updateuserdetails">
                <Button variant="outline" className="cursor-pointer">
                  Edit
                </Button>
              </Link>
              <Link href="/changepassword">
                <Button variant="outline" className="cursor-pointer">
                  Change Password
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default GetUserDetails;
