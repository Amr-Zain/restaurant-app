import CheckOutForm from "@/components/checkout/CheckOutForm";
import OrderDetails from "@/components/orders/orderDetails";
import { getCartServer } from "@/services/ApiHandler";
async function CheckOut() {
  const cart = await getCartServer();

  const orderSummary = {
    title: "Order Summary",
    currency: cart?.currency || "",
    items: [
      { label: "Subtotal", value: cart?.price?.sun_total || 0 },
      {
        label: `Shipping ${cart?.price?.delivery_price === 0 ? "Fee" : ""}`,
        value: cart?.price?.delivery_price || 0,
      },
      { label: "Surcharge", value: cart?.price?.surcharge || 0 },
      { label: "Tax", value: cart?.price?.tax_rate_value || 0 },
      /* { label: "Discount", value: data.price?.delivery_price || 0 }, */
    ],
    totalAmount: { label: "Total", value: cart?.price?.total || 0 },
  };
  console.log(cart)
  return (
    <div>
      {cart?.data?.products ? (
        <div className="container my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
          <CheckOutForm />

          <OrderDetails
            items={cart?.data.products?.map((item) => ({
              ...item.product,
              product:item.product,
              price: { price: item.total_price, currency: cart.currency },
            }))}
            orderSummary={orderSummary}
            canCancel
          />
        </div>
      ) : (
        <div className="text-sub my-20 text-center">your cart is emptiy</div>
      )}
    </div>
  );
}

export default CheckOut;
