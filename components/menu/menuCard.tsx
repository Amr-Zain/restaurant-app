import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import FavoritButton from "./FavoritButton";
import { Link } from "@/i18n/routing";

interface MenuCardProps {
  id: string,
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
  id,
  isOffer,
  oldPrice,
  offPercentage,
}: MenuCardProps) {
  return (
    <Card className="max-w-full gap-2 overflow-hidden p-2 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-58 max-h-62">
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
      <CardTitle className="text-lg"><Link href={`/menu/${id}`}>{title}</Link></CardTitle>
      <CardDescription className="line-clamp-2 text-sm">{desc}</CardDescription>
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col gap-1">
          {isOffer && oldPrice && (
            <>
              <span className="text-sub line-through">{oldPrice}EGP</span>
              <span className="text-text font-bold">{price}EGP</span>
            </>
          )}
        </div>
        {isOffer ? (
          <div className="bg-primary text-backgroud flex size-12 flex-col items-center justify-center rounded-full text-[12px] font-bold">
            <span>off</span>
            <span>{offPercentage}</span>
          </div>
        ) : (
          <FavoritButton isFavorit={isFavorit!} itemId={+id} />
        )}
      </div>
    </Card>
  );
}

export default MenuCard;
