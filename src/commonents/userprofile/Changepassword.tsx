"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { changepassword } from "@/apis/user/changepassword";

type userpassword = {
  password: string;
};

const Changepassword = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userpassword>();
  const onSubmit: SubmitHandler<userpassword> = async (data: userpassword) => {
    setLoading(true);
    changepassword(data.password).then((res) => {
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
  return (
    <section className="container mx-auto py-6 px-6 max-w-md">
      <Card className="p-6 shadow-md rounded-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-[#4B5487]">
            Change Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="brand">Enter Password</Label>
              <Input
                id="password"
                placeholder="Enter Password"
                type="password"
                className="mt-3"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
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
  );
};

export default Changepassword;
