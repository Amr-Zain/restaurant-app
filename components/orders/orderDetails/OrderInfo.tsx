import React from "react";
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  Package,
  CreditCard,
} from "lucide-react";
import map from "@/assets/images/map.png";
import OrderStatusComponent from "./OrderStatus";
import ReorderButton from "./ReorderButton";
import ReservationOrderInfo from "@/components/reservation/ReservationOrderInfo";
import { getTranslations } from "next-intl/server"

const OrderInfo = async ({
  id,
  callCenter,
  callCenterMessage,
  address,
  orderDate,
  orderTime,
  orderStatus,
}: {
  id: number;
  callCenter: string;
  orderDate: string;
  orderTime: string;
  callCenterMessage: string;
  address: Address;
  orderStatus: OrderStatus[];
}) => {
  const t = await getTranslations('reservations'); 

  const addressData = {
    label: t("shippingAddress"),
    labelIcon: <MapPin className="text-sub size-6" />,
    title: address?.title,
    desc: address?.desc,
    image: map as unknown as string,
  };
  const items = [
    {
      id: 0,
      Label: t("callCenter"),
      labelIcon: <Phone className="text-sub size-6" />,
      value: (
        <div className="rounded-xl bg-white p-4">
          {callCenterMessage && (
            <p className="mb-2 text-sm text-red-500">{callCenterMessage}</p>
          )}
          <p className="text-primary text-sm font-medium">{callCenter}</p>
        </div>
      ),
      span: true,
    },
    {
      id: 1,
      label: t("orderType"),
      value: t("delivery"),
      icon: <Package className="text-sub size-6" />,
    },
    {
      id: 2,
      label: t("paymentType"),
      value: t("cashOnDelivery"),
      icon: <CreditCard className="text-sub size-6" />,
    },
    {
      id: 3,
      label: t("dateOfOrder"),
      value: orderDate,
      icon: <Calendar className="text-sub size-5" />,
    },
    {
      id: 4,
      label: t("timeOfOrder"),
      value: orderTime,
      icon: <Clock className="text-sub size-5" />,
    },
  ];
  return (
    <div className="mx-auto w-full">
      <div className="p-6">
        <OrderStatusComponent orderStatus={orderStatus} />
        <ReservationOrderInfo
          address={addressData}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          items={items}
        />

        {orderStatus.find(
          (status) => status?.key === "finished" || status?.key === "delivered"
        )?.status !== "done" && <ReorderButton id={id} />}
      </div>
    </div>
  );
};

export default OrderInfo;