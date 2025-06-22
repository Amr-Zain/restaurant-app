import Item from "./Item";
import OrderSummary from "./OrderSummary";
import CancelOrder from "../CancelOrderModal";
import { CompletedIcon } from "@/components/Icons";
import { getTranslations } from "next-intl/server";

interface OrderSummary {
  title: string;
  currency: string;
  items: {
    label: string | React.ReactNode;
    value: number;
  }[];
  totalAmount: {
    label: string;
    value: number;
  };
}
async function OrderDetails({
  id,
  items,
  orderSummary,
  canCancel,
  status,
  statusTrans,
  orderNumber,
}: {
  id?: string;
  orderNumber?: string;
  statusTrans?: string;
  status?: string;
  items: Item[];
  canCancel?: boolean;
  orderSummary: OrderSummary;
}) {
  const t = await getTranslations('reservations'); 

  return (
    <div className="hidden rounded-3xl bg-white md:block">
      <div className="border-primary/20 border-b p-4">
        <h3 className="text-text text-2xl font-semibold">
          {id ? `${t("orderId")} - ${orderNumber}` : t("items")}
        </h3>
        {status &&
          ((statusTrans === "completed" || status === "finished") ? (
            <div className="flex gap-1 font-bold text-[#52B788] capitalize">
              <CompletedIcon />
              {statusTrans}
            </div>
          ) : (
            <CancelOrder canCancel={canCancel!} id={id!} status={status} />
          ))}
      </div>
      <div className="mb-4 flex grow-1 flex-col justify-between min-h-[70vh] gap-2 p-4">
        <div className="max-h-90 overflow-y-auto px-2">
          {items.map((item, i) => (
            <Item
              key={i}
              id={i}
              price={item.total_price}
              title={item.product.name}
              desc={item.sub_modifiers
                ?.map((sub) =>
                  sub.item_modifiers
                    .map(
                      (modifiers) =>
                        `${modifiers.quantity} X ${modifiers.name} (${modifiers.price?.price} ${modifiers.price?.currency}),\n `
                    )
                    .join("")
                )
                .join("")}
              image={item.product.image}
              currency={item.product.price.currency}
            />
          ))}
        </div>
        <OrderSummary {...orderSummary} />
      </div>
    </div>
  );
}

export default OrderDetails;