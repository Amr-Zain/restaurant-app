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
import OrderStatus from "./OrderStatus";

const OrderInfo = () => {
  const info = [
    { id: 1, label: "Order Type", value: "Delivery", icon: Package },
    {
      id: 2,
      label: "Payment Type",
      value: "Cash on delivery",
      icon: CreditCard,
    },
    { id: 3, label: "Date Of Order", value: "24/12/2022", icon: Calendar },
    { id: 4, label: "Time Of Order", value: "06:30 pm", icon: Clock },
  ];
  return (
    <div className="mx-auto w-full">
      <div className="p-6">
        <OrderStatus />

        <div className="mb-6">
          <div className="mb-3 flex flex-col gap-2">
            <div className="flex gap-2">
              <MapPin className="text-sub size-6" />
              <h3 className="text-text mb-1 font-bold">Shipping Address</h3>
            </div>
            <OrderItem
              key={`map`}
              id={1}
              title={"Shipping Address"}
              desc={
                "216-D Imam Abu Hanifa Road Dhaka 1216, Bangladesh Gulshan 1210-02"
              }
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
              <p className="mb-2 text-sm text-red-500">
                Your order has shipped. To cancel the order, contact the call
                center!
              </p>
              <p className="text-sm font-medium text-blue-600">
                +971 - 100684906
              </p>
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
