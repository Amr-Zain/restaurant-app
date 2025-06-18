
interface Props {
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
function OrderSummary({ title, items, totalAmount, currency }: Props) {
  
  return (
    <div>
      <h3 className="font-bold my-2">{title}</h3>
      <ul className="border-primary/20 rounded-3xl border-1 p-4">
        {items.map((items, i) => (
          <li className="flex justify-between py-1  text-text" key={i}>
            <h4 className="font-normal">{items.label}</h4>
            <div className="font-bold">{items.value.toFixed(2)} {currency}</div>
          </li>
        ))}
      <li className="flex justify-between pt-2 text-text border-t-1 border-primary/20">
        <h3 className="font-normal">{totalAmount.label}</h3>
        <div className="font-bold">{totalAmount.value.toFixed(2)} {currency}</div>
      </li>
      </ul>
    </div>
  );
}

export default OrderSummary;
