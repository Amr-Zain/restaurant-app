import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface MenuCardProps {
  image: string | StaticImageData;
  title: string;
  desc: string;
  price: number;
  rating: number;
  isFavorit?: boolean;
  isOffer?: boolean;
  oldPrice?: number;
  offPercentage?: string;
}

function MenuCard({
  image,
  title,
  desc,
  price,
  rating,
  isFavorit,
  isOffer,
  oldPrice,
  offPercentage,
}: MenuCardProps) {
  return (
    <Card className="w-92 max-w-full gap-2 overflow-hidden p-2 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-78">
        <Image
          src={image}
          alt={title}
          fill
          className="h-full rounded-xl object-cover"
        />
        <div className="absolute top-2 left-2 flex items-center justify-center gap-1 rounded-full bg-[#FAF3ED] px-2 py-1 backdrop-blur-md">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2873 0.671975L12.2998 4.88166C12.3873 5.13424 12.6498 5.30263 12.9123 5.38682L17.4623 6.06037C18.2498 6.06037 18.5123 6.90231 17.9873 7.40747L14.6623 10.691C14.4873 10.8594 14.3998 11.1962 14.3998 11.4488L15.1873 15.9952C15.2748 16.6688 14.5748 17.2581 13.9623 16.9214L9.84983 14.7323C9.58733 14.5639 9.32483 14.5639 9.06233 14.7323L4.94983 16.9214C4.33733 17.2581 3.54983 16.753 3.72483 15.9952L4.51233 11.4488C4.59983 11.1962 4.42483 10.8594 4.24983 10.691L0.924826 7.40747C0.487326 6.90231 0.749826 6.06037 1.44983 5.97618L5.99983 5.30263C6.26233 5.30263 6.52483 5.05005 6.61233 4.79747L8.62483 0.587781C9.06233 -0.00157483 9.93733 -0.00157492 10.2873 0.671975Z"
              fill="#F6C100"
            />
          </svg>
          <span>{rating}</span>
        </div>
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription className="line-clamp-2 text-sm">{desc}</CardDescription>
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col gap-1">
          <span className="text-sub line-through">{oldPrice}EGP</span>
          <span className="text-text font-bold">{price}EGP</span>
        </div>
        {isOffer ? (
          <div className="bg-primary text-backgroud flex size-12 flex-col items-center justify-center rounded-full text-[12px] font-bold">
            <span>off</span>
            <span>{offPercentage}</span>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="bg-primary/5 size-8 cursor-pointer rounded-full"
          >
            {isFavorit ? (
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.62 17.8101C10.28 17.9301 9.72 17.9301 9.38 17.8101C6.48 16.8201 0 12.6901 0 5.6901C0 2.6001 2.49 0.100098 5.56 0.100098C7.38 0.100098 8.99 0.980098 10 2.3401C10.5138 1.64597 11.183 1.08182 11.954 0.692841C12.725 0.303859 13.5764 0.100857 14.44 0.100098C17.51 0.100098 20 2.6001 20 5.6901C20 12.6901 13.52 16.8201 10.62 17.8101Z"
                  fill="#5A6AE8"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="22"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19.6501C10.69 19.6501 10.39 19.6101 10.14 19.5201C6.32 18.2101 0.25 13.5601 0.25 6.6901C0.25 3.1901 3.08 0.350098 6.56 0.350098C8.25 0.350098 9.83 1.0101 11 2.1901C12.17 1.0101 13.75 0.350098 15.44 0.350098C18.92 0.350098 21.75 3.2001 21.75 6.6901C21.75 13.5701 15.68 18.2101 11.86 19.5201C11.61 19.6101 11.31 19.6501 11 19.6501ZM6.56 1.8501C3.91 1.8501 1.75 4.0201 1.75 6.6901C1.75 13.5201 8.32 17.3201 10.63 18.1101C10.81 18.1701 11.2 18.1701 11.38 18.1101C13.68 17.3201 20.26 13.5301 20.26 6.6901C20.26 4.0201 18.1 1.8501 15.45 1.8501C13.93 1.8501 12.52 2.5601 11.61 3.7901C11.33 4.1701 10.69 4.1701 10.41 3.7901C9.48 2.5501 8.08 1.8501 6.56 1.8501Z"
                  fill="#5A6AE8"
                />
              </svg>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default MenuCard;
