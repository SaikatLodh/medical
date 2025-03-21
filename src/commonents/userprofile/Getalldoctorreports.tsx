"use client";

import { getAlldoctorreports } from "@/apis/user/getalldoctorreport";
import { getalldoctorreport } from "@/type/type";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type idparams = {
  id: string;
};
const Getalldoctorreports = () => {
  const params = useParams<idparams>();
  const [data, setData] = React.useState<getalldoctorreport[]>([]);

  useEffect(() => {
    const getalldoctorreports = () => {
      getAlldoctorreports(params.id).then((res) => {
        setData(res);
      });
    };
    getalldoctorreports();
  }, [params.id]);

  return (
    <div className="py-6">
      <h3 className="text-3xl font-bold text-center">All Reports</h3>
      <div className="flex flex-wrap px-6">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${item.image}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
/******  16756aad-cccf-4f4d-ae93-9e831a32e148  *******/

export default Getalldoctorreports;
