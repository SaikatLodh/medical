import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const downloadFile = async (path: string) => {
  const { data, error } = await supabase.storage.from("report").download(path);

  if (error) {
    return {
      status: 500,
      message: error.message,
      success: false,
    };
  }

  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = path.split("/").pop() || "download";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return {
    status: 200,
    message: "File downloaded successfully",
    success: true,
  };
};

export { downloadFile };
