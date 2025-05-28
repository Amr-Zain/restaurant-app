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
        <h3 className="text-white font-serif italic text-2xl text-center mb-4">{title}</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-white hover:text-gray-400"
                href="/"
              >
                {home}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-white hover:text-gray-400"
                href={href}
              >
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
