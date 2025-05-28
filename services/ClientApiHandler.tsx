"use client";
import AppError from "../utils/appError";
import axiosInstance from "./axiosClient";

export const getAllServices = async () => {
  return await axiosInstance
    .get("/all-services")
    .then((res) => res.data.data)
    .catch(() => []);
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
