import { Link } from "@/i18n/routing";
import OverlappingImages from "../general/OverlappedImages";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { getTranslations } from "next-intl/server";

export default async function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}) {
  const {
    id,
    date,
    from_time,
    guests_number,
    name,
    status,
    store,
    to_time,
    type,
  } = reservation;

  const displayDescription = `${store?.name || "Unknown Store"} on ${date} from ${from_time} to ${to_time}`;
  const t = await getTranslations();
  return (
    <Card className="order-card">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex gap-1 text-sm whitespace-nowrap text-gray-600">
          <span className="hidden sm:block">Reservation</span> #{id}
        </p>
        <div className="flex gap-1">
          <div className="order-status">
            {type}
          </div>
          <div className="order-status">
            {status}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-row items-center justify-center gap-2 sm:flex-col">
            <OverlappingImages images={[store?.image]} size={50} overlap={50} />
            <div className="mt-1 text-sm text-gray-600">
              {guests_number} {guests_number === 1 ? "guest" : "guests"}
            </div>
          </div>

          <div className="flex w-full grow items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-text font-semibold whitespace-nowrap">
                {name}
              </p>
              <div className="text-sub line-clamp-3">
                {displayDescription}
              </div>
            </div>
            <Link href={`/reservations/${id}`}>
              <Button className={`!size-10 self-end ${t('lang') ==='rtl'?'rotate-180':""}`}>
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
