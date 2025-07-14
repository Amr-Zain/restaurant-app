import ReservationOrderInfo from "@/components/reservation/ReservationOrderInfo";
import { getReservations, getSettingsData } from "@/services/ApiHandler";
import { Calendar, Clock, CreditCard, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const websiteSetting = (await getSettingsData()).website_setting;
    const t = await getTranslations();
    return {
      title: `${t('NAV.Reservation')} - ${websiteSetting.website_title}`,
    };
  } catch {
    return {};
  }
}
export default async function ReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations('reservations');
  let data = null;
  try {
    data = await getReservations(id);
  } catch (error: unknown) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error.status === 404) return notFound();
    throw error instanceof Error ? error.message : "error loaidng the data";
  }
  const address = {
    label: t("shippingAddress"),
    labelIcon: <MapPin className="text-sub size-6" />,
    title: data.store.name,
    desc: data.store.location_description,
    image: data.store.image,
  };
  const items = [
    {
      id: 1,
      Label: t("callCenter"),
      labelIcon: <Phone className="text-sub size-6" />,
      value: "+" + data.store.phone_code + "-" + data.store.phone,
      span: true,
    },
    {
      id: 2,
      Label: t("paymentType"),
      labelIcon: <CreditCard className="text-sub size-6" />,
      value: t("cash"),
    },
    { id: 3, Label: t("numberOfPersons"), value: data.guests_number },
    {
      id: 4,
      label: t("dateOfOrder"),
      value: data.date,
      icon: <Calendar className="text-sub size-5" />,
      span: true,
    },
    {
      id: 5,
      label: t("fromTime"),
      value: data.from_time,
      icon: <Clock className="text-sub size-5" />,
    },
    {
      id: 6,
      label: t("toTime"),
      value: data.to_time,
      icon: <Clock className="text-sub size-5" />,
    },
  ];

  return (
    <div className="container sec-p my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_380px]">
      <ReservationOrderInfo
        address={address}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        items={items}
      />
      <div className="hidden rounded-3xl bg-white md:block">
        <div className="border-primary/20 border-b p-4">
          <h3 className="text-text text-2xl font-semibold">
            {t("reservationId")} - {id}
          </h3>
        </div>
        <div className="mb-4 grow-1 p-4">
          <h3 className="font-semibold text-xl">{t("bookingSummary")}</h3>
          <div className="flex justify-between font-semibold text-lg p-4 border rounded-3xl gap-2">
            <div>{t("confirmationAmount")}</div>
            <div>
              {data.total_amount} {data.currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}