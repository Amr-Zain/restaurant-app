import Item from "./Item";
import OrderSummary from "./OrderSummary";
import CancelOrder from "./CancelOrderModal";
import { CompletedIcon } from "@/components/Icons";
import { getTranslations } from "next-intl/server";
import ReviewItem from "./ReviewItem";


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
  const t = await getTranslations("reservations");

  return (
    <div className="rounded-3xl bg-white">
      <div className="border-primary/20 border-b p-4">
        <h3 className="text-text text-2xl font-semibold">
          {id ? `${t("orderId")} - ${orderNumber}` : t("items")}
        </h3>
        {status &&
          (status === "completed" || status === "finished" ? (
            <div className="text-success mt-2 flex items-center gap-1 font-bold capitalize">
              <CompletedIcon className="fill-success" />
              {statusTrans}
            </div>
          ) : (
            <CancelOrder canCancel={canCancel!} id={id!} status={status} />
          ))}
      </div>
      <div className="mb-4 flex min-h-[70vh] grow-1 flex-col justify-between gap-2 p-4">
        <div className="max-h-90 overflow-y-auto px-2">
          {items.map((item, i) => (
            <Item
              key={`order-item ${item.id}`}
              id={i}
              url={`/menu/${item.product.slug}`}
              price={item.total_price}
              title={item.product.name}
              desc={item.sub_modifiers
                ?.map((sub) =>
                  sub.item_modifiers
                    .map(
                      (modifiers) =>
                        `${modifiers.quantity} X ${modifiers.name} (${modifiers.price?.price} ${modifiers.price?.currency}),\n `,
                    )
                    .join(""),
                )
                .join("")}
              image={item.product.image}
              currency={item.product.price.currency}
            >
              {(!item.is_rate &&
                (status === "completed" || status === "finished") )&& (
                  <ReviewItem
                    orderId={id!}
                    id={item.id}
                    image={item.product.image}
                    name={item.product.name}
                  />
                )}
            </Item>
          ))}
        </div>
        <OrderSummary {...orderSummary} />
      </div>
    </div>
  );
}

export default OrderDetails;
