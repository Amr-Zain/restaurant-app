import React from "react";
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  Package,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderItem from "./Item";
import map from "@/assets/images/map.png";
import OrderStatusComponent from "./OrderStatus";

const OrderInfo = ({
  callCenter,
  callCenterMessage,
  address,
  orderDate,
  orderTime,
  orderStatus
}: {
  callCenter: string;
  orderDate: string;
  orderTime: string;
  callCenterMessage: string;
  address: Address;
  orderStatus: OrderStatus[]
}) => {
  const info = [
    { id: 1, label: "Order Type", value: "Delivery", icon: Package },
    {
      id: 2,
      label: "Payment Type",
      value: "Cash on delivery",
      icon: CreditCard,
    },
    { id: 3, label: "Date Of Order", value: orderDate, icon: Calendar },
    { id: 4, label: "Time Of Order", value: orderTime, icon: Clock },
  ];
  return (
    <div className="mx-auto w-full">
      <div className="p-6">
        <OrderStatusComponent orderStatus={orderStatus}/>

        <div className="mb-6">
          <div className="mb-3 flex flex-col gap-2">
            <div className="flex gap-2">
              <MapPin className="text-sub size-6" />
              <h3 className="text-text mb-1 font-bold">Shipping Address</h3>
            </div>
            <OrderItem
              key={`map`}
              id={1}
              title={address.title}
              desc={address.desc}
              image={map}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Phone className="text-sub size-6" />
              <h3 className="text-text mb-1 font-bold">Call Center</h3>
            </div>
            <div className="rounded-xl bg-white p-4">
              {callCenterMessage && (
                <p className="mb-2 text-sm text-red-500">{callCenterMessage}</p>
              )}
              <p className="text-sm font-medium text-primary">{callCenter}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          {info.map((item) => (
            <div key={item.id} className="space-y-2">
              <h4 className="text-text text-sm font-bold">{item.label}</h4>
              <div className="flex items-center space-x-2 rounded-xl bg-white p-4">
                <item.icon className="text-sub size-5" />
                <span className="text-text text-sm">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <Button className="!h-10">Track Order</Button>
      </div>
    </div>
  );
};

export default OrderInfo;
