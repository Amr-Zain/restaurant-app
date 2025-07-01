import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Trash } from "@/components/Icons";
import { Link } from "@/i18n/routing";

function OrderItem({
  title,
  image,
  desc,
  price,
  currency,
  onDelete,
  onUpdate,
  className,
  url,
  children,
}: {
  id: number;
  title: string;
  url?: string;
  desc: string;
  className?: string;
  image: string | StaticImageData;
  price?: number;
  currency?: string;
  children?: React.ReactNode;
  onDelete?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void> | void;
  onUpdate?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void> | void;
}) {
  return (
    <Card
      className={
        "border-primary/20 mb-2 gap-2 bg-transparent p-2 shadow-none transition-shadow hover:shadow-sm " +
        className
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <div className="relative aspect-video w-28 shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="h-full rounded-xl object-cover"
            />
          </div>
          <div>
            <div>
              <CardTitle className="line-clamp-2 text-lg">
                {url ? <Link href={url}>{title}</Link> : title}
              </CardTitle>
              <CardDescription className="text-sub line-clamp-5 text-sm">
                {desc}
              </CardDescription>
              <div className="text-text font-semibold">
                {price} {currency}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {onDelete && (
            <button type="button" onClick={onDelete} className="cursor-pointer text-red-600">
              <Trash />
            </button>
          )}
          {onUpdate && (
            <button type="button" onClick={onUpdate} className="cursor-pointer text-red-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V12"
                  stroke="#BDC1DF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.0399 2.02025L7.15988 9.90025C6.85988 10.2003 6.55988 10.7903 6.49988 11.2203L6.06988 14.2303C5.90988 15.3203 6.67988 16.0803 7.76988 15.9303L10.7799 15.5003C11.1999 15.4403 11.7899 15.1403 12.0999 14.8403L19.9799 6.96025C21.3399 5.60025 21.9799 4.02025 19.9799 2.02025C17.9799 0.0202527 16.3999 0.660253 15.0399 2.02025V2.02025Z"
                  stroke="#BDC1DF"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.9102 3.15039C14.2417 4.32786 14.8701 5.40046 15.7351 6.26544C16.6001 7.13042 17.6727 7.7588 18.8502 8.09039"
                  stroke="#BDC1DF"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        {children}
      </div>
    </Card>
  );
}

export default OrderItem;
