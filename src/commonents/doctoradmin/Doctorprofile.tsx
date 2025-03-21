"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { addDoctors } from "@/type/type";
import { getSingleDoctor } from "@/apis/admin/getsingledoctor";
import { updatedoctor } from "@/apis/admin/updatedoctor";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const Doctorprofile = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [id, setId] = React.useState("");
  const { register, handleSubmit, setValue } = useForm<addDoctors>();
  const [imageUrl, setImageUrl] = React.useState("");
  const [image, setImage] = React.useState("");
  const supabase = createClient();
  const getId = async () => {
    const { data } = await supabase.auth.getUser();
    setId(data.user.id);
  };
  getId();

  React.useEffect(() => {
    getSingleDoctor(id).then((res) => {
      if (res) {
        setValue("photo", res.photo);
        setValue("name", res.name);
        setValue("email", res.email);
        setValue("speciality", res.speciality);
        setValue("education", res.education);
        setValue("experience", res.experience);
        setValue("addressone", res.addressone);
        setValue("addresstwo", res.addresstwo);
        setValue("fees", res.fees);
        setValue("description", res.description);
        setValue("password", res.password);
        setImage(res.photo);
      }
    });
  }, [id, setValue]);
  const onSubmit: SubmitHandler<addDoctors> = (data: addDoctors) => {
    setLoading(true);
    const doctorData = {
      photo: data?.photo,
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

    updatedoctor(doctorData, id).then(
      (
        res: { message: string; status: number; success: boolean } | undefined
      ) => {
        if (res?.success === true) {
          setLoading(false);
          toast.success(res.message);
          router.push("/admin/doctorslist");
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
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        <Link href="/doctoradmin/changepassword">
          <Button
            type="submit"
            className=" bg-[#5E6EFF] mb-4 ml-2 cursor-pointer"
          >
            Change Password
          </Button>
        </Link>
        <Card className="p-6 shadow-md rounded-lg">
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {imageUrl ? (
                    <img src={imageUrl} alt="" />
                  ) : (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${image}`}
                      alt=""
                    />
                  )}
                </div>
                <p className="text-gray-600">Upload doctor picture</p>

                <input
                  type="file"
                  accept="image/png , image/jpeg , image/jpg , image/webp"
                  {...register("photo")}
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </div>
              <div>
                <Label>Doctor Name</Label>
                <Input
                  placeholder="Name"
                  className="mt-3"
                  type="text"
                  {...register("name")}
                />
              </div>
              <div>
                <Label>Speciality</Label>
                <Input
                  placeholder="Speciality
                  "
                  className="mt-3"
                  type="text"
                  {...register("speciality")}
                />
              </div>
              <div>
                <Label>Doctor Email</Label>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="mt-3"
                  {...register("email")}
                  disabled
                />
              </div>
              <div>
                <Label>Education</Label>
                <Input
                  placeholder="Education"
                  className="mt-3"
                  type="text"
                  {...register("education")}
                />
              </div>
              <div>
                <Label>Doctor Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="mt-3"
                  {...register("password")}
                  disabled
                />
              </div>
              <div>
                <Label>Experience</Label>
                <Input
                  placeholder="Experience
                  "
                  className="mt-3"
                  type="number"
                  {...register("experience")}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  placeholder="Address 1"
                  className="mt-3"
                  type="text"
                  {...register("addressone")}
                />

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
                  {...register("fees")}
                />
              </div>
              <div className="col-span-2">
                <Label>About me</Label>
                <Textarea
                  placeholder="Write about yourself"
                  className="mt-3"
                  typeof="text"
                  {...register("description")}
                />
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

export default Doctorprofile;
