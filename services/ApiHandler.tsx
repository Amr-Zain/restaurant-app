"use server";
import axiosInstance from "./instance";
import AppError from "../utils/appError";
import { transformData } from "@/helper/functions";

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
    console.log(data)
    return data.data as HomePageData;
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
    const { data } = await axiosInstance.get("/web_settings");
    return transformData(data.data);
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
    return (data.data as CMSPage[]) || [];
  } catch {
    throw "Failed to fetch Sort data";
  }
};

export const getCmsPage = async (
  url: string,
): Promise<{ data: CmsPageContent }> => {
  try {
    const { data } = await axiosInstance.get(url);
    console.log(data);
    return (data as { data: CmsPageContent }) || [];
  } catch (error) {
    throw error;
  }
};
export const getMenuFilter = async (): Promise<{
  text: string;
  content: MenuCategory[];
}> => {
  try {
    const { data } = await axiosInstance.get("get-filter", {
      headers: { os: "" },
    });
    return (
      (data.data as { content: MenuCategory[]; text: string }) || {
        content: [],
        text: "",
      }
    );
  } catch (error) {
    console.log(error);
    throw "error loading data";
  }
};
export const getMenuProducts = async (params: {
[key: string]: string|number;
}): Promise<{ data: Product[]; meta: unknown }> => {
  try {
    const { data } = await axiosInstance.get("product", { params });
    return (
      (data as { data: Product[]; meta: unknown }) || {
        content: [],
      }
    );
  } catch (error) {
    console.log(error);
    throw "error loading data";
  }
};
export const getOffers = async (params?: { lat: number; lng: number }) => {
  try {
    const { data } = await axiosInstance.get(`offers`, {
      params,
    });
    console.log(data);
    return (
      (data as { data: Product[]; meta: Meta; links: Links }) || {
        data: [],
        meta: {},
      }
    );
  } catch (error) {
    console.log(error);
    throw "error loading data";
  }
};
export const getProfuctDeiltals = async(slug:string)=>{
  try {
    const { data } = await axiosInstance.get(`product/${slug}`)
    return data.data as ProductData || {}

  } catch (error) {
    console.error(error);
    throw error
  }
}
export const getProductReviews = async (id:number)=>{
  try {
    const { data } = await axiosInstance.get(`products/${id}/reviews`)
    return data as ProductReviewsResponse
  
  } catch (error) {
    console.log(error);
    throw error 
  }

}
export const getCartServer = async ():Promise<CartApiResponse> => {
  const { data } = await axiosInstance.get("carts");
  return data;
};
export const getOrdersReservations= async({status, page}:{status:string, page:number}):Promise<OrdersResponse>=>{
  const { data } = await axiosInstance.get('orders-and-reservations',{params:{status, page}});
  return data as OrdersResponse;
}
export const getOrder= async(id:string):Promise<{data:Order}>=>{
  const { data } = await axiosInstance.get('orders/'+id);
  return data as {data:Order};
}
export const getReservations= async(id:string)=>{
  const { data } = await axiosInstance.get('reservations/'+id);
  return data.data as Reservation;
}
export const getNotifications = async() => {
  try{
    const { data } = await axiosInstance.get("notifications");
    return data.data as Notification[] ||[]  

  }catch(err){
    console.log(err)
  }
  return []
};
/* export const getSettingsData = async () => {
  return await axiosInstance.get("web_settings");
}; */
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

// 

// export const getTermsData = async () => {
//   return await axiosInstance.get(`/term`);
// };

// export const getPrivacyData = async () => {
//   return await axiosInstance.get(`/policy`);
// };
