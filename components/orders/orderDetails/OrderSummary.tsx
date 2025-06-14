interface Props {
  title: string;
  currency: string;
  items: {
    label: string;
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
      <h3 className="font-semibold">{title}</h3>
      <ul className="border-primary/20 rounded-3xl border-1 p-4">
        {items.map((items, i) => (
          <li className="flex justify-between py-1  text-text" key={i}>
            <h4>{items.label}</h4>
            <div className="">{items.value.toFixed(2)} {currency}</div>
          </li>
        ))}
      <li className="flex justify-between pt-2 text-text border-t-1 border-primary/20">
        <h3  >{totalAmount.label}</h3>
        <div>{totalAmount.value.toFixed(2)} {currency}</div>
      </li>
      </ul>
    </div>
  );
}

export default OrderSummary;
