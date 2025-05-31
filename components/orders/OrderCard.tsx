import { StaticImageData } from "next/image";
import OverlappingImages from "../general/OverlappedImages";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";

function OrderCard({
  id,
  types,
  images,
  desc,
}: {
  id: string;
  types: string[];
  desc: string;
  images: string[] | StaticImageData[];
}) {
  return (
    <Card className="sm:w-136 max-w-[95%] mx-auto gap-2 border-0 p-2 shadow-none transition-shadow hover:shadow-sm">
      <div className="flex justify-between">
        <p className="flex gap-1 text-sub whitespace-nowrap"><span className="hidden sm:block">order</span> #{id}</p>
        <div className="flex gap-1">
          {types.map((type, index) => (
            <div
              key={index}
              className="h-9 text-primary bg-primary/10 flex items-center gap-1 rounded-full px-3 py-2 text-xs"
            >
              {type}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center  gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <OverlappingImages images={images} size={64} overlap={64 * (0.2 * (images.length))} />
            <div className="text-sub text-sm">
              {images.length} {images.length === 1 ? "item" : "items"}
            </div>
          </div>
          <div className="flex grow-1 justify-between">
            <div>
              <p className="text-text font-semibold whitespace-nowrap">
                order #{id}
              </p>
              <div className="text-sub line-clamp-3 max-w-64">{desc}</div>
            </div>
              <Link href={`/orders/${id}`}>
            <Button className="!size-12 self-end">
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.43 13.8201C12.24 13.8201 12.05 13.7501 11.9 13.6001C11.61 13.3101 11.61 12.8301 11.9 12.5401L17.44 7.00012L11.9 1.46012C11.61 1.17012 11.61 0.690117 11.9 0.400117C12.19 0.110117 12.67 0.110117 12.96 0.400117L19.03 6.47012C19.32 6.76012 19.32 7.24012 19.03 7.53012L12.96 13.6001C12.81 13.7501 12.62 13.8201 12.43 13.8201Z"
                    fill="white"
                  />
                  <path
                    d="M18.33 7.75012H1.5C1.09 7.75012 0.75 7.41012 0.75 7.00012C0.75 6.59012 1.09 6.25012 1.5 6.25012H18.33C18.74 6.25012 19.08 6.59012 19.08 7.00012C19.08 7.41012 18.74 7.75012 18.33 7.75012Z"
                    fill="white"
                  />
                </svg>
            </Button>
              </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;
