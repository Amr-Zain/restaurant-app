import NotFound from "@/components/NotFound";
import { getCmsPage, getCmsPages } from "@/services/ApiHandler";
import GeneralSection from "@/components/general/GeneralSection";
import HeroSection from "@/components/general/HeroSection";
import { getTranslations } from "next-intl/server";

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

        {
          pageData.addition_data &&
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
            ))
          /*  <div className="mt-10 border-t pt-8">
            <div className="mb-6 flex items-center justify-center gap-2">
              <h3 className="text-text text-center text-2xl font-bold md:text-3xl">
                More Details
              </h3>
              {pageData.icon && (
                <Image
                  src={pageData.icon}
                  alt={`${pageData.title} icon`}
                  width={40}
                  height={40}
                  className="border-primary rounded-full border-2 object-contain p-2"
                />
              )}
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pageData.addition_data.map((item, index) => (
                <Card key={item.id + index} className="rounded-lg bg-white p-4">
                  {item.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-text mb-2 text-xl font-semibold">
                      {item.heading}
                    </h4>
                    <div
                      className="prose text-sub mb-4 leading-normal"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div> */
        }
      </div>
    </>
  );
}
