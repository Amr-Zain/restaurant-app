import ContactUsForm from "@/components/contact/ContactForm";
import BranchCard from "@/components/branches/BranchCard";
import HeroSection from "@/components/general/HeroSection";
import { serverCachedFetch } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import GoogleMapWithBranches from "@/components/contact/Map";
import { Metadata } from "next";
import { customFetch } from "@/helper/fetchServerOptions";

export async function generateMetadata(): Promise<Metadata> {
  try {
     const { url: settingUrl, fetchOptions } = await customFetch(
          "/web_settings",
          {
            method: "GET",
          },
        );
        const title = (
          await serverCachedFetch({
            url: settingUrl,
            requestHeaders: fetchOptions,
            revalidate: 3600,
          })
        ).data.website_setting.website_title;
    const t = await getTranslations();
    return {
      title: `${t('NAV.contact')} - ${title}`,
    };
  } catch {
    return {};
  }
}
export default async function AboutPage() {
  const t = await getTranslations();
  const { url, fetchOptions } = await customFetch(
      "/stores",
      {
        method: "GET",
      },
    );
    const branches = (
      await serverCachedFetch({
        url,
        requestHeaders: fetchOptions,
        revalidate: 3600,
      }) as Branch[]
    );
    console.log(branches)
  //const branches = await getBranchs();
  
  const locations = branches.map((branch) => ({
    id: branch.id,
    name: branch.name,
    address:branch.name,
    position: { lat: branch.lat, lng: branch.lng! },
  }));
  return (
    <div className="space-y-16">
      <HeroSection
        title={t("NAV.contact")}
        home={t("NAV.home")}
        section={t("NAV.contact")}
        href="/about"
        dir={t('lang')}
      />
      <div className="p-sec mx-auto space-y-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {branches.length ? (
            branches.map((branch) => (
              <BranchCard key={`branch ${branch.id}`} {...branch} />
            ))
          ) : (
            <p className="text-sub text-center">No branches found.</p>
          )}
        </div>
        <div className="container grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 md:grid-cols-2">
          <ContactUsForm />
          <GoogleMapWithBranches locations={locations} />
        </div>
      </div>
    </div>
  );
}
