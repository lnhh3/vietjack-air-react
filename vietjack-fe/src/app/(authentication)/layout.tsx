"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

import useAuth from "@/stores/useAuth";

const Layout = ({ children }: PropsWithChildren) => {
  const { accessToken } = useAuth();
  const router = useRouter();
  useLayoutEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken]);

  return <div>{children}</div>;
};

export default Layout;
