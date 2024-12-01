"use client";

import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

import Button from "@/components/core/Button";
import ContainerBackground from "@/components/core/ContainerBackground";
import Input from "@/components/core/Input";
import type { HttpResponse } from "@/http/type";
import { authService } from "@/service/auth";
import useAuth from "@/stores/useAuth";
import { LoginRequest } from "@/types/auth";

const LoginPage = () => {
  const { setAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { getFieldProps, handleSubmit, errors } = useFormik<LoginRequest>({
    initialValues: {
      password: "",
      email: "",
    },
    innerRef: undefined,
    isInitialValid: undefined,

    validationSchema: yup.object().shape({
      password: yup.string().required(),
      email: yup.string().email().required().email(),
    }),
    async onSubmit(values) {
      try {
        setIsLoading(true);
        const data = await authService.login(values);
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
        setIsLoading(false);
        toast.success("Đăng nhập thành công!");
        // @ts-ignore
      } catch (e: HttpResponse<any>) {
        toast.error(e.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <ContainerBackground className="min-h-[calc(100vh_-_75px)] flex items-center justify-center">
      <div className="max-w-[720px] w-full mx-auto p-10 bg-white rounded-2xl z-20">
        <h1 className="text-center text-[28px] text-black font-semibold italic py-2">Đăng nhập </h1>
        <div className="flex flex-col items-center gap-3 max-w-[300px] mx-auto">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="font-medium text-[14px]">
              Email
            </label>
            <Input
              fieldInputProps={getFieldProps("email")}
              className="w-full"
              placeholder="Vui lòng nhập mail"
            />
            {errors.email && (
              <span className="text-[14px] text-red-500 mt-1">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="font-medium text-[14px]">
              Mật khẩu
            </label>
            <Input
              fieldInputProps={getFieldProps("password")}
              className="w-full"
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
            />
            {errors.password && (
              <span className="text-[14px] text-red-500 mt-1">
                {errors.password}
              </span>
            )}
          </div>
          <Button
            loading={isLoading}
            className="w-full mt-5"
            onClick={() => handleSubmit()}
          >
            Đăng nhập
          </Button>
          <div className="w-full flex justify-end">
            <Link
              href="/sign-up"
              className="text-[13px] text-blue-600 font-medium text-right"
            >
              Bạn chưa có tài khoản?
            </Link>
          </div>
        </div>
      </div>
    </ContainerBackground>
  );
};

export default LoginPage;
