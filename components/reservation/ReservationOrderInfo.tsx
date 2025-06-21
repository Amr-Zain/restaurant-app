import Card from "../orders/orderDetails/Item";
import React from "react";

interface DataItem {
  id: number;
  Label: string;
  labelIcon?: React.ReactNode;
  value: string | number;
  span?: boolean;
  icon?: React.ReactNode;
}
function ReservationOrderInfo({
  address,
  items,
}: {
  items: DataItem[];
  address?: {
    label: string;
    title: string;
    desc: string;
    image: string;
    labelIcon: React.ReactNode;
  };
}) {
  return (
    <div>
      {address?.title && (
        <div className="mb-3 flex flex-col gap-2">
          <div className="flex gap-2">
            {address.labelIcon}
            <h3 className="text-text mb-1 font-bold">{address.label}</h3>
          </div>
          <Card id={1} {...address!} />
        </div>
      )}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className={`${item.span ? "col-span-2" : ""}`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {item.labelIcon}
                <h3 className="text-text mb-1 font-bold">{item.Label}</h3>
              </div>
              <div className="flex items-center space-x-2 rounded-xl bg-white p-4">
                {item.icon}
                <span className="text-text text-sm">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationOrderInfo;
