"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getUser } from "@/apis/user/getuser";
import { User } from "@/type/type";
import { updateUserDetails } from "@/apis/user/updateuserdetails";
import { useRouter } from "next/navigation";

const UpdateUserDetails = () => {
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<User>();
  useEffect(() => {
    getUser().then((res) => {
      if (res) {
        setUser(res);
        setValue("phone", res?.phone || "");
        setValue("address", res?.address || "");
        setValue("gender", res?.gender || "");
        setValue("birthday", res?.birthday || "");
        setImageUrl(res?.profilepic);
      }
    });
  }, []);

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    setLoading(true);
    updateUserDetails(data, user?.id).then((res) => {
      if (res?.success === true) {
        toast.success(res.message);
        setLoading(false);
        router.push("/getprofile");
      }

      if (res?.success === false) {
        toast.error(res.message);
        setLoading(false);
      }
    });
  };

  return (
    <div>
      <section className="container mx-auto py-6 px-6 max-w-md">
        <Card className="p-6 shadow-md rounded-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-[#4B5487]">
              Update User Details
            </h2>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center my-5">
              {image ? (
                <img src={image} alt="" />
              ) : (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${imageUrl}`}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="brand">Phone Number</Label>
                <Input
                  id="Address"
                  placeholder="Enter Phone Number"
                  type="number"
                  className="mt-3"
                  {...register("phone")}
                />
              </div>
              <div>
                <Label htmlFor="model">Address</Label>
                <Input
                  id="Address"
                  type="text"
                  placeholder="Enter Address"
                  className="mt-3"
                  {...register("address")}
                />
              </div>
              <div>
                <Label htmlFor="year">Gender</Label>
                <Input
                  id="gender"
                  type="text"
                  placeholder="Enter Gender"
                  className="mt-3"
                  {...register("gender")}
                />
              </div>
              <div>
                <Label htmlFor="color">Date of Birth</Label>
                <Input
                  id="birth"
                  placeholder="Enter car color"
                  type="date"
                  className="mt-3"
                  {...register("birthday")}
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">Profile Picture</Label>
                <Input
                  id="profilepicture"
                  type="file"
                  className="mt-3"
                  {...register("profilepic")}
                  accept="image/png , image/jpeg , image/jpg , image/webp"
                  onChange={(e) => {
                    setImage(URL.createObjectURL(e.target.files![0]));
                  }}
                />
              </div>
              {loading ? (
                <Button
                  className="w-full bg-[#5E6DFF] cursor-pointer duration-300 transition-all"
                  disabled
                >
                  Loading...
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
    </div>
  );
};

export default UpdateUserDetails;
