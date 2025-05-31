import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

function OrderItem({
  title,
  image,
  desc,
  price,
}: {
  id: string;
  title: string;
  desc: string;
  image: string | StaticImageData;
  price: number;
}) {
  return (
    <Card className="!w-full gap-2 p-2 mb-2 bg-transparent border-primary/20 shadow-none transition-shadow hover:shadow-sm sm:w-136">
      <div className="flex gap-2">

      <div className="relative w-28 aspect-video">
        <Image
          src={image}
          alt={title}

          fill
          className="h-full rounded-xl object-cover"
        />
      </div>
      <div>
        <CardTitle className="text-lg font-normal">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sub text-sm">
          {desc}
        </CardDescription>
        <div className="text-text font-semibold">{price}EGP</div>
      </div>
      </div>

    </Card>
  );
}

export default OrderItem;
