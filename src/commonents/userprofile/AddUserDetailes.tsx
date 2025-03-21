"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getUser } from "@/apis/user/getuser";
import { addUserDetails } from "@/apis/user/adduserdetails";
import { User } from "@/type/type";
import { useRouter } from "next/navigation";

const AddUserDetailes = () => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    setLoading(true);
    addUserDetails(data, user?.id).then((res) => {
      if (res.success === true) {
        toast.success(res.message);
        setLoading(false);
        reset();
        router.push("/getprofile");
      }

      if (res.success === false) {
        toast.error(res.message);
        setLoading(false);
      }
    });
  };
  console.log(image);
  return (
    <>
      <section className="container mx-auto py-6 px-6 max-w-md">
        <Card className="p-6 shadow-md rounded-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-[#4B5487]">
              Add User Details
            </h2>
            {image && (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center my-5">
                <img src={image} alt="" />
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="brand">Phone Number</Label>
                <Input
                  id="Phone"
                  placeholder="Enter Phone Number"
                  type="number"
                  className="mt-3"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone Number is required",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="model">Address</Label>
                <Input
                  id="Address"
                  type="text"
                  placeholder="Enter Address"
                  className="mt-3"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address Number is required",
                    },
                  })}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="year">Gender</Label>
                <Input
                  id="gender"
                  type="text"
                  placeholder="Enter Gender"
                  className="mt-3"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Gender is required",
                    },
                  })}
                />
                {errors.gender && (
                  <span className="text-red-500 text-sm">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="color">Date of Birth</Label>
                <Input
                  id="birth"
                  placeholder="Enter car color"
                  type="date"
                  className="mt-3"
                  {...register("birthday", {
                    required: {
                      value: true,
                      message: "Date of Birth is required",
                    },
                  })}
                />
                {errors.birthday && (
                  <span className="text-red-500 text-sm">
                    {errors.birthday.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="registrationNumber">Profile Picture</Label>
                <Input
                  id="profilepicture"
                  type="file"
                  className="mt-3"
                  accept="image/png , image/jpeg , image/jpg , image/webp"
                  {...register("profilepic", {
                    required: {
                      value: true,
                      message: "Profile Picture is required",
                    },
                  })}
                  onChange={(e) => {
                    if (e.target.files) {
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {errors.profilepic && (
                  <span className="text-red-500 text-sm">
                    {errors.profilepic.message}
                  </span>
                )}
              </div>
              {loading ? (
                <Button
                  className="w-full bg-[#5E6DFF] cursor-pointer duration-300 transition-all"
                  disabled
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-[#5E6DFF] cursor-pointer duration-300 transition-all"
                >
                  Submit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default AddUserDetailes;
