"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "@/apis/doctorauth/login";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
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
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    setLoading(true);
    login(formdata)
      .then((res) => {
        console.log(res);
        toast.success(`${res?.message}`);
        setLoading(false);
        reset();
        router.push("/doctoradmin");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[90vh] rounded-2xl">
        <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-900">
              Doctor Login
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please login to book appointment
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
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
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <p className="text-red-500 mt-2">{errors?.email?.message}</p>
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
                  <p className="text-red-500 mt-2">
                    {errors?.password?.message}
                  </p>
                </div>
                {loading ? (
                  <Button
                    className="w-full bg-[#5F6FFF] text-white hover:bg-blue-700 cursor-pointer"
                    disabled
                  >
                    Log In
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-[#5F6FFF] text-white hover:bg-blue-700 cursor-pointer"
                    type="submit"
                  >
                    Log In
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
