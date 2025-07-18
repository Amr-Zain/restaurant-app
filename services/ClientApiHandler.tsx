"use client";
import {
  AddressSchemaType,
  ContactFormType,
  ForgatPasswordFormType,
  LoginFormType,
  OTPSchemaType,
  PhoneFormType,
  profileFromType,
  RegisterFormType,
  ReservationFromType,
} from "@/helper/schema";
import axiosInstance from "./axiosClient";
import { format } from "date-fns";
import { CartItem } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

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

export const sendProfileVerificationCode = async (form: {
  phone_code: string;
  phone: string;
}) => {
  const { data } = await axiosInstance.post(
    "profile/send_verification_code",
    form,
  );
  return data;
};

export const updatePhone = async (form: PhoneFormType & OTPSchemaType) => {
  const { data } = await axiosInstance.post("profile/update_phone", {
    phone_code: form.phone_code,
    phone: form.phone,
    verification_code: form.reset_code,
  });
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
export const resetPassword = async (
  form: ForgatPasswordFormType & PhoneFormType & OTPSchemaType,
) => {
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
      console.error(error);
    } else {
      //throw new AppError("Field to fetch home", 500);
    }
  }
};
export const postReservation = async ({
  form,
  id,
}: {
  form: ReservationFromType;
  id: string;
}) => {
  const { data } = await axiosInstance.post(`/reservations?store_id=${id}`, {
    ...form,
    date: format(form.date, "yyyy-MM-dd"),
  });
  return data || [];
};
export const postContactForm = async (
  form: ContactFormType,
)=> {
  const { data } = await axiosInstance.post(`contact_us`, form);
  return data || [];
};
export const getBranchs = async () => {
  try {
    const { data } = await axiosInstance.get(`/stores`);
    return (data.data as Branch[]) || [];
  } catch {
    throw "Failed to fetch Sort data";
  }
};
export const taggleFavorit = async ({
  favorit,
  id,
}: {
  favorit: boolean;
  id: number;
}): Promise<{ data: Product; status: string }> => {
  try {
    let data = null;
    if (favorit) {
      data = (await axiosInstance.post(`favourite`, { product_id: id })).data;
    } else {
      data = (await axiosInstance.delete(`/favourite/${id}`)).data;
    }
    return data as { data: Product; status: string };
  } catch (error: unknown) {
    console.error(error);
    throw error instanceof Error ? error.message : "unexpected error";
  }
};
export const getFavourites = async (): Promise<{
  data: Product[];
  status: string;
}> => {
  try {
    const data = (await axiosInstance.get(`favourite`))?.data;
    return data as { data: Product[]; status: string };
  } catch (error: unknown) {
    console.error(error);
    throw error instanceof Error ? error.message : "unexpected error";
  }
};
export const getAddress = async (): Promise<{
  data: Address[];
  success: string;
}> => {
  try {
    const data = (await axiosInstance.get(`address`))?.data;
    return data as { data: Address[]; success: string };
  } catch (error: unknown) {
    console.error(error);
    throw error instanceof Error ? error.message : "unexpected error";
  }
};
export const deleteAddress = async (id: number) => {
  try {
    const data = (await axiosInstance.delete(`address/${id}`))?.data;
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw error instanceof Error ? error.message : "unexpected error";
  }
};
export const updateProfileImage = async (formData: FormData) => {
  const data = await axiosInstance.post(`store_attachment`, formData);
  return data.data;
};
export const updateUserProfile = async (form: profileFromType) => {
  try {
    const { data } = await axiosInstance.post(`profile`, {
      ...form,
      _method: "patch",
    });

    return data;
  } catch (error: unknown) {
    console.error(error);
    throw error instanceof Error ? error.message : "unexpected error";
  }
};
export const postAddress = async (form: AddressSchemaType) => {
  if (!form.is_default) delete form.is_default;
  const { data } = await axiosInstance.post(`address`, form);
  return data;
};
export const updateAddress = async (form: AddressSchemaType, id: number) => {
  if (!form.is_default) delete form.is_default;
  const { data } = await axiosInstance.patch(`address/${id}`, form);
  return data;
};
export const getCart = async ({
  params,
}: {
  params?: Record<string, string>;
}): Promise<CartApiResponse> => {
  const { data } = await axiosInstance.get("carts", {
    params: {
      ...params,
      lat: useAuthStore.getState().location.lat,
      lng: useAuthStore.getState().location.lng,
    },
  });
  return data;
};
export const addToCart = async (
  item: CartItem & { store_id: number },
): Promise<CartApiResponse> => {
  const { data } = await axiosInstance.post("carts", item, {
    params: {
      lat: useAuthStore.getState().location.lat,
      lng: useAuthStore.getState().location.lng,
    },
  });
  return data;
};
export const postProductReview = async (
  orderId: string,
  payload: { order_item_id: number; rate: number; review: string },
): Promise<CartApiResponse> => {
  const { data } = await axiosInstance.post(
    `orders/${orderId}/review-item`,
    payload,
  );
  return data;
};
export const updateCart = async (body: {
  cart_product_id: number;
  quantity: number;
}): Promise<CartApiResponse> => {
  const { data } = await axiosInstance.post(
    "carts/update-count",
    {
      ...body,
      _method: "put",
    },
    {
      params: {
        lat: useAuthStore.getState().location.lat,
        lng: useAuthStore.getState().location.lng,
      },
    },
  );
  return data;
};
export const clearCart = async () => {
  const { data } = await axiosInstance.delete("carts");
  return data;
};
export const deleteFromCart = async (id: number) => {
  const { data } = await axiosInstance.delete(`carts/delete-item/${id}`);
  return data;
};
export const deleteAccount = async () => {
  try {
    const { data } = await axiosInstance.post("setting/delete_account");
    useAuthStore.getState().clearUser();
    return data;
  } catch (error: unknown) {
    console.error(error);
    return error;
  }
};
export const changeNotificationStatus = async () => {
  try {
    const { data } = await axiosInstance.post(
      "setting/change_notification_status",
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    return error;
  }
};
export const deleteNotification = async (id:number|string) => {
  try {
    const { data } = await axiosInstance.delete(
      `notification/${id}`,
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    return error;
  }
};
export const cancelOrder = async (id: string) => {
  const { data } = await axiosInstance.post(`orders/${id}/cancel`, {
    _method: "put",
  });
  return data;
};
export const createOrder = async () => {};
export const postOrder = async (form: unknown) => {
  const { data } = await axiosInstance.post("orders", form);
  return data;
};
export const Reorder = async (id: number) => {
  const { data } = await axiosInstance.post(`orders/${id}/re_order`);
  return data;
};
export const getWallet = async () => {
  try {
    const { data } = await axiosInstance.get("wallet");
    return data.data;
  } catch (err: unknown) {
    console.error(err);
    return {};
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
export const payment = async (checkoutPayload:Record<string,unknown>)=>{
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(checkoutPayload),
    });
    return response.json()
}