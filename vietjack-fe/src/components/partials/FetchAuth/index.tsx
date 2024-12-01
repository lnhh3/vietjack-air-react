"use client";

import { useLayoutEffect } from "react";

import useAuth from "@/stores/useAuth";

const FetchAuth = () => {
  const { accessToken, fetchUserAuth, signOut } = useAuth();

  useLayoutEffect(() => {
    if (accessToken) {
      fetchUserAuth().then();
    }
  }, [accessToken]);

  return <></>;
};

export default FetchAuth;
