"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoctor } from "@/apis/admin/adddoctor";
import toast from "react-hot-toast";
import { addDoctors } from "@/type/type";

const AddDoctor = () => {
  const [loading, setLoading] = React.useState(false);
  const [picture, setPicture] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addDoctors>();
  const onSubmit: SubmitHandler<addDoctors> = (data: addDoctors) => {
    setLoading(true);
    const doctorData = {
      photo: data?.photo[0],
      name: data?.name,
      email: data?.email,
      speciality: data?.speciality,
      education: data?.education,
      password: data?.password,
      experience: data?.experience,
      addressone: data?.addressone,
      addresstwo: data?.addresstwo,
      fees: data?.fees,
      description: data?.description,
    };

    addDoctor(doctorData).then(
      (
        res: { message: string; status: number; success: boolean } | undefined
      ) => {
        console.log(res);
        if (res?.success === true) {
          setLoading(false);
          toast.success(res.message);
          reset();
          setPicture("");
        }

        if (res?.success === false) {
          setLoading(false);
          toast.error(res.message);
        }
      }
    );
  };

  return (
    <div>
      <section className="container mx-auto py-6 px-6 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4"> Doctor Profile</h2>

        <Card className="p-6 shadow-md rounded-lg">
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src={picture} alt="" />
                </div>
                <p className="text-gray-600">Upload doctor picture</p>

                <input
                  type="file"
                  accept="image/png , image/jpeg , image/jpg , image/webp"
                  {...register("photo", {
                    required: {
                      value: true,
                      message: "Please upload a photo",
                    },
                  })}
                  onChange={(e) => {
                    if (e.target.files) {
                      setPicture(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {errors.photo && (
                  <p className="text-red-500">{errors.photo.message}</p>
                )}
              </div>
              <div>
                <Label>Doctor Name</Label>
                <Input
                  placeholder="Name"
                  className="mt-3"
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please enter your name",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label>Speciality</Label>
                <Input
                  placeholder="Speciality
                "
                  className="mt-3"
                  type="text"
                  {...register("speciality", {
                    required: {
                      value: true,
                      message: "Please enter your speciality",
                    },
                  })}
                />
                {errors.speciality && (
                  <p className="text-red-500">{errors.speciality.message}</p>
                )}
              </div>
              <div>
                <Label>Doctor Email</Label>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="mt-3"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter your email",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label>Education</Label>
                <Input
                  placeholder="Education"
                  className="mt-3"
                  type="text"
                  {...register("education", {
                    required: {
                      value: true,
                      message: "Please enter your education",
                    },
                  })}
                />
                {errors.education && (
                  <p className="text-red-500">{errors.education.message}</p>
                )}
              </div>
              <div>
                <Label>Doctor Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="mt-3"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter your password",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label>Experience</Label>
                <Input
                  placeholder="Experience
                "
                  className="mt-3"
                  type="number"
                  {...register("experience", {
                    required: {
                      value: true,
                      message: "Please enter your experience",
                    },
                  })}
                />
                {errors.experience && (
                  <p className="text-red-500">{errors.experience.message}</p>
                )}
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  placeholder="Address 1"
                  className="mt-3"
                  type="text"
                  {...register("addressone", {
                    required: {
                      value: true,
                      message: "Please enter your address",
                    },
                  })}
                />
                {errors.addressone && (
                  <p className="text-red-500">{errors.addressone.message}</p>
                )}
                <Input
                  placeholder="Address 2 (Optional)"
                  className="mt-3"
                  type="text"
                  {...register("addresstwo")}
                />
              </div>
              <div>
                <Label>Fees</Label>
                <Input
                  placeholder="Your fees"
                  className="mt-3"
                  type="number"
                  {...register("fees", {
                    required: {
                      value: true,
                      message: "Please enter your fees",
                    },
                  })}
                />
                {errors.fees && (
                  <p className="text-red-500">{errors.fees.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <Label>About me</Label>
                <Textarea
                  placeholder="Write about yourself"
                  className="mt-3"
                  typeof="text"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Please enter your description",
                    },
                  })}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="col-span-2">
                {loading ? (
                  <Button
                    type="submit"
                    className="w-full bg-[#5E6EFF] cursor-pointer"
                    disabled
                  >
                    loading...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#5E6EFF] cursor-pointer"
                  >
                    Add Doctor
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AddDoctor;
