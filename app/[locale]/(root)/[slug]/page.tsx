import NotFound from "@/components/NotFound";
import { serverCachedFetch } from "@/services/ApiHandler";
import GeneralSection from "@/components/general/GeneralSection";
import HeroSection from "@/components/general/HeroSection";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { customFetch } from "@/helper/fetchServerOptions";
// import { Metadata } from "next";

// interface CmsPageForPaths {
//   slug: string;
// }

interface ApiResponse {
  data: CmsPageContent;
}

// export async function generateStaticParams(): Promise<CmsPageForPaths[]> {
//   try {
//      const { url, fetchOptions } = await customFetch("cms-pages/", {
//       method: "GET",
//     });
//     const cmsPages: CmsPageForPaths[] =  await serverCachedFetch({
//       url,
//       requestHeaders: fetchOptions,
//       revalidate: 3600,
//     });
    
//     if (!cmsPages || cmsPages.length === 0) {
//       console.warn("No CMS pages found, using fallback pages");
//       return [
//         { slug: "privacy-policy" },
//         { slug: "terms-and-conditions" },
//         { slug: "about-us" },
//       ];
//     }
    
//     return cmsPages.map((page) => ({
//       slug: page.slug,
//     }));
//   } catch (error) {
//     console.error("Error generating static params for CMS pages:", error);
//     return [
//       { slug: "privacy-policy" },
//       { slug: "terms-and-conditions" },
//       { slug: "about-us" },
//     ];
//   }
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
  
//   try {
//     const { url, fetchOptions } = await customFetch("cms-pages/" + slug, {
//       method: "GET",
//     });
    
//     const { data: page }: ApiResponse = await serverCachedFetch({
//       url,
//       requestHeaders: fetchOptions,
//       revalidate: 3600,
//     });

//     return {
//       title: page?.title || slug,
//       description: page?.desc || `${slug} page`,
//       openGraph: {
//         title: page?.title || slug,
//         description: page?.desc || `${slug} page`,
//         images: page?.image ? [page.image] : undefined,
//       },
//     };
//   } catch (error) {
//     console.error(`Error generating metadata for slug: ${slug}`, error);
//     return {
//       title: slug,
//       description: `${slug} page`,
//     };
//   }
// }

export default async function CMSPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let pageData: CmsPageContent | null = null;
  
  try {
    const t = await getTranslations();
    
    const { url, fetchOptions } = await customFetch("cms-pages/" + slug, {
      method: "GET",
    });
    
    console.log("Fetching CMS page:", { slug, url });

    const response: ApiResponse = await serverCachedFetch({
      url,
      requestHeaders: fetchOptions,
      revalidate: 3600,
    });
    
    pageData = response.data;
    
    if (!pageData) {
      console.error(`No data returned for slug: ${slug}`);
      notFound();
    }

    return (
      <>
        <HeroSection
          title={pageData.title || slug}
          home={t("NAV.home")}
          section={pageData.title || slug}
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

          {pageData.addition_data?.map((item, index) => (
            <GeneralSection
              key={`${slug}-additional-${item.id || index}`}
              className={index % 2 === 0 ? "order-last my-8" : "my-8"}
              item={{
                title: item.heading,
                heading: pageData?.heading,
                image: item.image,
                desc: item.desc,
              }}
            />
          ))}
        </div>
      </>
    );
  } catch (error: unknown) {
    console.error("Error fetching CMS page:", error);
    
    // Type guard for error handling
    if (error && typeof error === 'object' && 'status' in error) {
      const statusError = error as { status: number };
      if (statusError.status === 404) {
        console.error(`CMS page not found (404) for slug: ${slug}`);
        notFound();
      }
    }
    
    // For any other error, show NotFound component
    console.error(`An unexpected error occurred for slug: ${slug}`, error);
    return <NotFound />;
  }
}