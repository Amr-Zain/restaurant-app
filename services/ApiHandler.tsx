"use server";
import axiosInstance from "./instance";
import AppError from "../utils/appError";

export const getServiceBySlug = async (slug: string) => {
  try {
    const { data } = await axiosInstance.get(`/services/${slug}`);

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("Field to fetch home", 500);
    }
  }
};
export const getHomeData = async () => {
  try {
    const { data } = await axiosInstance.get("/home");

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("Field to fetch home", 500);
    }
  }
};
export const getAboutData = async () => {
  try {
    const { data } = await axiosInstance.get("/about");

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("Field to fetch home", 500);
    }
  }
};
export const getSettingsData = async () => {
  try {
    const { data } = await axiosInstance.get("/settings");

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("Field to fetch home", 500);
    }
  }
};
export const getProfile = async () => {
  try {
    const { data } = await axiosInstance.get("profile");
    console.log("data", data);
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
    }
  }
};

export const getBranchs = async (): Promise<Branch[]> => {
  try {
    const { data } = await axiosInstance.get(`/stores`);
    return data.data || [];
  } catch {
    throw "Failed to fetch Sort data";
  }
};
export const getCmsPages = async (): Promise<CMSPage[]> => {
  try {
    const { data } = await axiosInstance.get(`cms-pages`);
    return data.data as CMSPage[] || [];
  } catch {
    throw "Failed to fetch Sort data";
  }
};
export const getCmsPage = async (url:string): Promise<{data:CmsPageContent}> => {
  try {
    const { data } = await axiosInstance.get(url);
    console.log(data)
    return data as {data:CmsPageContent} || [];
  } catch (error) {
      throw error;
  }
};
// export const getCategoriesData = async () => {
//   try {
//     const { data } = await axiosInstance.get("/categories");
//     return data?.data || [];
//   } catch {
//     throw new CustomError("Failed to fetch Categories data", 500, "APIError");

//   }
// };

// export const getShareData = async () => {
//   return await axiosInstance.get("/relations");
// };

// export const getSettingsData = async () => {
//   return await axiosInstance.get("/settings");
// };

// export const getTermsData = async () => {
//   return await axiosInstance.get(`/term`);
// };

// export const getPrivacyData = async () => {
//   return await axiosInstance.get(`/policy`);
// };
