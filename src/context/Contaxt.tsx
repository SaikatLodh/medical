"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const Contaxt = createContext<{ user: boolean }>({ user: false });

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createClient();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    };
    getUser();
  });

  return <Contaxt.Provider value={{ user }}>{children}</Contaxt.Provider>;
};

export const useAppContext = () => useContext(Contaxt);
