import NotFound from "@/components/NotFound";
import {
  getCmsPage,
  getCmsPages,
  getSettingsData,
} from "@/services/ApiHandler";
import GeneralSection from "@/components/general/GeneralSection";
import HeroSection from "@/components/general/HeroSection";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface CmsPageForPaths {
  slug: string;
}

export async function generateStaticParams(): Promise<CmsPageForPaths[]> {
  try {
    const cmsPages: CmsPageForPaths[] = await getCmsPages();

    return cmsPages.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for CMS pages:", error);
    return [];
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ cms: string }>;
}): Promise<Metadata> {
  const { cms } = await params;
  try {
    const page = (await getCmsPage("cms-pages/" + cms)).data;
    const title = (await getSettingsData()).website_setting.website_title;
    return {
      title: `${page.title} - ${title}`,
      description: page.desc,
      openGraph: {
        images: page.image,
      },
    };
  } catch {
    return {};
  }
}
export default async function CMSPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cms = (await params).slug;
  let pageData = null;
  const t = await getTranslations();
  try {
    const apiResponse = await getCmsPage("cms-pages/" + cms);
    if (apiResponse && apiResponse.data) {
      pageData = apiResponse.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching CMS page:", error);
    if (error?.status && error.status === 404) {
      console.log(`CMS page not found (404) for slug: ${cms}`);
      notFound();
    } else {
      console.error(`An unexpected error occurred for slug: ${cms}`, error);
    }
    pageData = null;
  }

  if (!pageData) {
    return <NotFound />;
  }

  return (
    <>
      <HeroSection
        title={pageData.title}
        home={t("NAV.home")}
        section={pageData.title}
        href={pageData.slug}
        dir={t("lang")}
      />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <GeneralSection
          item={{
            title: pageData.title,
            heading: pageData.heading,
            image: pageData.image,
            desc: pageData.desc,
          }}
        />

        {pageData.addition_data &&
          pageData.addition_data.map((item, i) => (
            <GeneralSection
              key={`${cms} ${item.id}`}
              className={i % 2 === 0 ? "order-last my-8" : "my-8"}
              item={{
                title: item.heading,
                heading: pageData.heading,
                image: item.image,
                desc: item.desc,
              }}
            />
          ))}
      </div>
    </>
  );
}
