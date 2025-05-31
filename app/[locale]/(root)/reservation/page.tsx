
import HeroSection from "@/components/general/HeroSection";
import ReservationForm from "@/components/reservation/ReservationForm";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
    const t = await getTranslations();
  return (
    <div className="space-y-12">
        <HeroSection title={t('NAV.Reservation')} home={t('NAV.home')} section={t('NAV.Reservation')} href="/reservation" />
      <div className="mx-auto w-full sm:w-[90%] mb-12">
        <ReservationForm />
      </div>
    </div>
  );
}
