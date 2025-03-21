"use client";

import AdminSidebar from "@/commonents/admin/AdminSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminSidebar children={children} />
    </>
  );
};

export default layout;
