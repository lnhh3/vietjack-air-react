"use client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

import Button from "@/components/core/Button";
import ContainerBackground from "@/components/core/ContainerBackground";
import Input from "@/components/core/Input";
import { type HttpResponse } from "@/http/type";
import { authService } from "@/service/auth";
import useAuth from "@/stores/useAuth";
import { SignUpRequest } from "@/types/auth";

const SignUpPage = () => {
  const { setAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { getFieldProps, handleSubmit, errors } = useFormik<SignUpRequest>({
    initialValues: {
      password: "",
      email: "",
      phoneNumber: "",
      fullName: "",
    },
    innerRef: undefined,
    isInitialValid: undefined,

    validationSchema: yup.object().shape({
      password: yup.string().required(),
      email: yup.string().email().required().email(),
      phoneNumber: yup.string().required(),
      fullName: yup.string().required(),
    }),
    async onSubmit(values: SignUpRequest) {
      try {
        setIsLoading(true);
        const data = await authService.signUp(values);
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
        setIsLoading(false);
        toast.success("Sign up successfully.");

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
        <h1 className="text-center text-[28px] text-black font-semibold italic py-2">Đăng ký</h1>
        <div className="flex flex-col items-center gap-3 max-w-[300px] mx-auto">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="font-medium text-[14px]">
              Email
            </label>
            <Input
              className="w-full"
              placeholder="Nhập email"
              fieldInputProps={getFieldProps("email")}
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
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <span className="text-[14px] text-red-500 mt-1">
                {errors.password}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="phone" className="font-medium text-[14px]">
              Số điện thoại
            </label>
            <Input
              fieldInputProps={getFieldProps("phoneNumber")}
              className="w-full"
              type="text"
              placeholder="SĐT"
            />
            {errors.phoneNumber && (
              <span className="text-[14px] text-red-500 mt-1">
                {errors.phoneNumber}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="font-medium text-[14px]">
              Họ tên
            </label>
            <Input
              fieldInputProps={getFieldProps("fullName")}
              className="w-full"
              type="text"
              placeholder="Nhập họ tên"
            />
            {errors.fullName && (
              <span className="text-[14px] text-red-500 mt-1">
                {errors.fullName}
              </span>
            )}
          </div>
          <Button
            loading={isLoading}
            type="submit"
            className="w-full mt-5"
            onClick={() => handleSubmit()}
          >
            Đăng ký
          </Button>
          <div className="w-full flex justify-end">
            <Link
              href="/login"
              className="text-[13px] text-blue-600 font-medium text-right"
            >
              Đã có tài khoản?
            </Link>
          </div>
        </div>
      </div>
    </ContainerBackground>
  );
};

export default SignUpPage;
