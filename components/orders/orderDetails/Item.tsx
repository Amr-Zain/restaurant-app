import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

function OrderItem({
  title,
  image,
  desc,
  price,
  currency,
  onDelete,
  onUpdate,
}: {
  id: number;
  title: string;
  desc: string;
  image: string | StaticImageData;
  price?: number;
  currency?: string;
  onDelete?: () => Promise<void> | void;
  onUpdate?: () => Promise<void> | void;
}) {
  return (
    <Card className="border-primary/20 mb-2 !w-full gap-2 bg-transparent p-2 shadow-none transition-shadow hover:shadow-sm sm:w-136">
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <div className="relative aspect-video w-28">
            <Image
              src={image}
              alt={title}
              fill
              className="h-full rounded-xl object-cover"
            />
          </div>
          <div>
            <div>
              <CardTitle className="text-lg font-normal">{title}</CardTitle>
              <CardDescription className="text-sub line-clamp-2 text-sm">
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
            <div onClick={onDelete} className="cursor-pointer text-red-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9997 6.72998C20.9797 6.72998 20.9497 6.72998 20.9197 6.72998C15.6297 6.19998 10.3497 5.99998 5.11967 6.52998L3.07967 6.72998C2.65967 6.76998 2.28967 6.46998 2.24967 6.04998C2.20967 5.62998 2.50967 5.26998 2.91967 5.22998L4.95967 5.02998C10.2797 4.48998 15.6697 4.69998 21.0697 5.22998C21.4797 5.26998 21.7797 5.63998 21.7397 6.04998C21.7097 6.43998 21.3797 6.72998 20.9997 6.72998Z"
                  fill="#FF445B"
                />
                <path
                  d="M8.50074 5.72C8.46074 5.72 8.42074 5.72 8.37074 5.71C7.97074 5.64 7.69074 5.25 7.76074 4.85L7.98074 3.54C8.14074 2.58 8.36074 1.25 10.6907 1.25H13.3107C15.6507 1.25 15.8707 2.63 16.0207 3.55L16.2407 4.85C16.3107 5.26 16.0307 5.65 15.6307 5.71C15.2207 5.78 14.8307 5.5 14.7707 5.1L14.5507 3.8C14.4107 2.93 14.3807 2.76 13.3207 2.76H10.7007C9.64074 2.76 9.62074 2.9 9.47074 3.79L9.24074 5.09C9.18074 5.46 8.86074 5.72 8.50074 5.72Z"
                  fill="#FF445B"
                />
                <path
                  d="M15.2104 22.7501H8.79039C5.30039 22.7501 5.16039 20.8201 5.05039 19.2601L4.40039 9.19007C4.37039 8.78007 4.69039 8.42008 5.10039 8.39008C5.52039 8.37008 5.87039 8.68008 5.90039 9.09008L6.55039 19.1601C6.66039 20.6801 6.70039 21.2501 8.79039 21.2501H15.2104C17.3104 21.2501 17.3504 20.6801 17.4504 19.1601L18.1004 9.09008C18.1304 8.68008 18.4904 8.37008 18.9004 8.39008C19.3104 8.42008 19.6304 8.77007 19.6004 9.19007L18.9504 19.2601C18.8404 20.8201 18.7004 22.7501 15.2104 22.7501Z"
                  fill="#FF445B"
                />
                <path
                  d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
                  fill="#FF445B"
                />
                <path
                  d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                  fill="#FF445B"
                />
              </svg>
            </div>
          )}
          {onUpdate && (
            <div onClick={onUpdate} className="cursor-pointer text-red-600">
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
                  stroke-miterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default OrderItem;
