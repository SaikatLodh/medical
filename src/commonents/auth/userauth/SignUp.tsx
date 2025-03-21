"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "@/apis/user/signup";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
type Inputs = {
  fullname: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const formdata = new FormData();
    formdata.append("fullname", data.fullname);
    formdata.append("email", data.email);
    formdata.append("password", data.password);

    setLoading(true);
    signup(formdata).then((res) => {
      console.log(res);
      toast(`${res?.message}`);
      setLoading(false);
      reset();
      router.push("/login");
    });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-[90vh] rounded-2xl">
        <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-900">
              Create Account
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please sign up to book appointment
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="mt-5"
                    {...register("fullname", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                  />
                  {errors.fullname && (
                    <p className="text-red-500">{errors.fullname.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-5"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-5"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {loading ? (
                  <Button
                    className="w-full bg-[#5F6FFF] text-white hover:bg-blue-700 cursor-pointer"
                    disabled
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-[#5F6FFF] text-white hover:bg-blue-700 cursor-pointer"
                    type="submit"
                  >
                    Create account
                  </Button>
                )}
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#5F6FFF] hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
