"use client";
import {
  ForgatPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from "@/helper/schema";
import axiosInstance from "./axiosClient";

export const getAllServices = async () => {
  return await axiosInstance
    .get("/all-services")
    .then((res) => res.data.data)
    .catch(() => []);
};

export const register = async (form: RegisterFormType) => {
  const { data } = await axiosInstance.post("auth/register", {
    ...form,
    password_confirmation: form.password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("auth/logout", {
    device_type: "web",
  });
  return data;
};

export const forgotPassword = async (form: {
  phone_code: string;
  phone: string;
}) => {
  const { data } = await axiosInstance.post("auth/forgot_password", form);
  return data;
};
export const verifyForgotPassword = async (
  form: {
    phone_code: string;
    phone: string;
    reset_code: string;
  },
  url: string,
) => {
  const verify = {
    phone_code: form.phone_code,
    phone: form.phone,
    verification_code: form.reset_code,
    device_type: "web",
  };
  const { data } = await axiosInstance.post(
    "auth/" + url,
    url === "verify_phone" ? verify : form,
  );
  return data;
};
export const resetPassword = async (form: ForgatPasswordFormType) => {
  const { data } = await axiosInstance.post("auth/reset_password", form);
  return data;
};

export const login = async (form: LoginFormType) => {
  const { data } = await axiosInstance.post("auth/login", {
    ...form,
    device_type: "web",
  });
  return data;
};

export const getCodes = async () => {
  try {
    const { data } = await axiosInstance.get("brand_country");
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      //throw new AppError(error.message, 500);
      console.log(error);
    } else {
      //throw new AppError("Field to fetch home", 500);
    }
  }
};

// export const getCategoryData = async (id: number) => {
//     try {
//       const { data } = await axiosInstance.get(`/categories?category_id=${id}`);
//       return data?.data || [];
//     } catch {
//       throw new CustomError("Failed to fetch Category data", 500, "APIError");
//     }
//   };
//   export const getProductsByCategory = async (id: number, params: any) => {
//     console.log("🚀 ~ getProductsByCategory ~ params:", params);
//     try {
//       const { data } = await axiosInstance.get(`/products`, {
//         params: { category_id: id, ...params },
//       });
//       return data || [];
//     } catch (error) {
//       console.error("Error fetching products by category:", error);
//       return [];
//     }
//   };

//   export const getSortData = async () => {
//     try {
//       const { data } = await axiosInstance.get(`/sort`);
//       return data || [];
//     } catch {
//       throw new CustomError("Failed to fetch Sort data", 500, "APIError");
//     }
//   };

//   export const getBrandsData = async (key?:number) => {
//     try {
//       const { data } = await axiosInstance.get(`/brands_without_paginate${key?`?keyword=${key}` : ""}`);
//       return data || [];
//     } catch {
//       throw new CustomError("Failed to fetch brands data", 500, "APIError");
//     }
//   };
