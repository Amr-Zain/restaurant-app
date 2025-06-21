import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function HeroSection({
  title,
  home,
  section,
  href,
}: {
  title: string;
  home: string;
  section: string;
  href: string;
}) {
  return (
    <section className="relative flex h-52 w-[100hw] flex-col items-center justify-center bg-[url('@/assets/images/hero.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/40" />
      <div className="z-10 mb-4">
        <h3 className="font-Allura mb-4 text-center text-4xl text-white md:text-5xl">
          {title}
        </h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-sub text-white" href="/">
                {home}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-sub text-white" href={href}>
                {section}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}

export default HeroSection;
