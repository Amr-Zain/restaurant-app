import axiosInstance from "./instance";
import AppError from "../utils/appError";
import { transformData } from "@/helper/functions";
import { unstable_cacheLife as cacheLife } from "next/cache";

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
export const getHomeData = async (url: string, requestHeaders: RequestInit) => {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(url, requestHeaders);
    const data = await res.json();
    console.log("requestHeaders");
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
  /*  "use cache";
  cacheLife("days"); */
  try {
    const { data } = await axiosInstance.get("/web_settings");
    return transformData(data.data);
  } catch (error) {
    /* if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("Field to fetch home", 500);
    } */
    console.error(error);
    throw "error loading data";
  }
};
export const getProfile = async () => {
  try {
    const { data } = await axiosInstance.get("profile");
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
  /*   "use cache"; */
  try {
    const { data } = await axiosInstance.get(url);
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
    console.error(error);
    throw "error loading data";
  }
};
export const getMenuProducts = async (params: {
  [key: string]: string | number;
}): Promise<{ data: Product[]; meta: unknown }> => {
  try {
    const { data } = await axiosInstance.get("product", { params });
    return (
      (data as { data: Product[]; meta: unknown }) || {
        content: [],
      }
    );
  } catch (error) {
    console.error(error);
    throw "error loading data";
  }
};
export const getOffers = async (params?: { page?: number }) => {
  try {
    const { data } = await axiosInstance.get(`offers`, {
      params,
    });
    console.error(data);
    return (
      (data as { data: Product[]; meta: Meta; links: Links }) || {
        data: [],
        meta: {},
      }
    );
  } catch (error) {
    console.error(error);
    throw "error loading data";
  }
};
export const getProductDeiltals = async (slug: string) => {
  /*  "use cache"; */
  try {
    const { data } = await axiosInstance.get(`product/${slug}`);
    return (data.data as ProductData) || {};
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getProductReviews = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`products/${id}/reviews`);
    return data as ProductReviewsResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCartServer = async (): Promise<CartApiResponse> => {
  try {
    const { data } = await axiosInstance.get("carts");
    return data;
  } catch {
    return {
      data: {},
    } as CartApiResponse;
  }
};
export const getOrdersReservations = async ({
  status,
  page,
}: {
  status: string;
  page: number;
}): Promise<OrdersResponse> => {
  const { data } = await axiosInstance.get("orders-and-reservations", {
    params: { status, page },
  });
  return data as OrdersResponse;
};
export const getOrder = async (id: string): Promise<{ data: Order }> => {
  const { data } = await axiosInstance.get("orders/" + id);
  return data as { data: Order };
};
export const getReservations = async (id: string) => {
  const { data } = await axiosInstance.get("reservations/" + id);
  return data.data as Reservation;
};
export const getNotifications = async () => {
  try {
    const { data } = await axiosInstance.get("notifications");
    return (data.data as Notification[]) || [];
  } catch (err) {
    console.error(err);
  }
  return [];
};
export const getWallet = async () => {
  try {
    const { data } = await axiosInstance.get("wallet");
    return data.data;
  } catch (err: unknown) {
    console.error(err);
    return;
  }
};
export const getLoyalCard = async () => {
  try {
    const { data } = await axiosInstance.get("loyal_card");
    return data.data;
  } catch (err: unknown) {
    console.error(err);
    return;
  }
};

export const serverCachedFetch = async ({
  url,
  requestHeaders,
  revalidate,
  tags,
}: {
  url: string;
  requestHeaders?: RequestInit;
  revalidate: number;
  tags?: string[];
}) => {
  "use cache";
  //cacheLife('hours');
  try {
    const res = await fetch(url, {
      ...requestHeaders,
      next: { revalidate, tags },
    });
    const data = await res.json();
    return data ;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("Field to fetch home", 500);
    }
  }
};
