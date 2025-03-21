"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { report } from "@/apis/user/report";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Inputs = {
  file: File;
};

const Report = () => {
  const { control, handleSubmit } = useForm<Inputs>();
  const [preview, setPreview] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: Inputs) => {
    setLoading(true);
    const file = data.file;

    report(file!, params?.id).then((res) => {
      if (res?.success === true) {
        setLoading(false);
        toast.success(res.message);
        router.push(`/getalldoctorreports/${params?.id}`);
      }

      if (res?.success === false) {
        toast.error(res.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="h-[60vh] flex items-center justify-center overflow-y-auto">
      <Card className="p-6 shadow-md rounded-lg max-w-md mx-auto">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Upload File</h2>
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="file"
                control={control}
                rules={{ required: "File is required" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer flex items-center gap-2 text-gray-600 border p-2 rounded-md hover:bg-gray-100"
                    >
                      <Upload size={18} /> Choose File
                    </Label>

                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </>
                )}
              />

              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Selected file"
                    className="w-full h-auto rounded-md shadow"
                  />
                </div>
              )}

              {loading ? (
                <Button className="w-full cursor-pointer mt-4" disabled>
                  Upload
                </Button>
              ) : (
                <Button className="w-full cursor-pointer mt-4" type="submit">
                  Upload
                </Button>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
