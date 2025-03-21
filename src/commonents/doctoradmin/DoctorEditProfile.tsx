"use client"

import React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DoctorEditProfile = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        speciality: "General physician",
        experience: "",
        education: "",
        address1: "",
        address2: "",
        fees: "",
        about: "",
      });
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Doctor Details Submitted:", form);
      };
  return (
    <div>
    <section className="container mx-auto py-6 px-6 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <Card className="p-6 shadow-md rounded-lg">
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                📷
              </div>
              <p className="text-gray-600">Upload doctor picture</p>
            </div>
            <div>
              <Label>Doctor Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="mt-3"
              />
            </div>
            <div>
              <Label>Speciality</Label>
              <Input
                name="speciality"
                value={form.name}
                onChange={handleChange}
                placeholder="Speciality
                "
                className="mt-3"
              />
            </div>
            <div>
              <Label>Doctor Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                className="mt-3"
              />
            </div>
            <div>
              <Label>Education</Label>
              <Input
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="Education"
                className="mt-3"
              />
            </div>
            <div>
              <Label>Doctor Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-3"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience
                "
                className="mt-3"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                name="address1"
                value={form.address1}
                onChange={handleChange}
                placeholder="Address 1"
                className="mt-3"
              />
              <Input
                name="address2"
                value={form.address2}
                onChange={handleChange}
                placeholder="Address 2"
                className="mt-3"
              />
            </div>
            <div>
              <Label>Fees</Label>
              <Input
                name="fees"
                value={form.fees}
                onChange={handleChange}
                placeholder="Your fees"
                className="mt-3"
              />
            </div>
            <div className="col-span-2">
              <Label>About me</Label>
              <Textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Write about yourself"
                className="mt-3"
              />
            </div>
            <div className="col-span-2">
              <Button type="submit" className="w-full bg-[#5E6EFF]">
                Edite Doctor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  </div>
  )
}

export default DoctorEditProfile
