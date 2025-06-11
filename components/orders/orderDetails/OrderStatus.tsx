function OrderStatus() {
  const orderSteps = [
    { id: 1, label: "Ordered", completed: true },
    { id: 2, label: "Confirmed", completed: true },
    { id: 3, label: "Shipped", completed: false },
    { id: 4, label: "Delivered", completed: false },
  ];

  return (
    <div className="mb-8 flex items-center justify-between px-4 w-full"> 
      {orderSteps.map((step, index) => (
        <div key={step.id} className={`flex items-center  ${index < orderSteps.length - 1 ?"flex-1":'shrink-1'}`}>
          <div className="flex flex-col items-center">
            <div
              className={`flex size-6 items-center justify-center rounded-full text-sm font-medium`}
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 0C4.99 0 0.5 4.49 0.5 10C0.5 15.51 4.99 20 10.5 20C16.01 20 20.5 15.51 20.5 10C20.5 4.49 16.01 0 10.5 0ZM15.28 7.7L9.61 13.37C9.46938 13.5105 9.27875 13.5893 9.08 13.5893C8.88125 13.5893 8.69063 13.5105 8.55 13.37L5.72 10.54C5.58052 10.3989 5.5023 10.2084 5.5023 10.01C5.5023 9.81157 5.58052 9.62114 5.72 9.48C6.01 9.19 6.49 9.19 6.78 9.48L9.08 11.78L14.22 6.64C14.51 6.35 14.99 6.35 15.28 6.64C15.57 6.93 15.57 7.4 15.28 7.7Z"
                  fill={step.completed ? "#5A6AE8" : "#979EC5"}
                />
              </svg>
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                step.completed ? "text-primary" : "text-sub" }`}
            >
              {step.label}
            </span>
          </div>
          {index < orderSteps.length - 1 && (
            <div
              className={`h-0.5 flex-1 self-start mt-[.8rem] ${
                orderSteps[index + 1].completed ? "bg-primary" : "bg-sub"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderStatus;
