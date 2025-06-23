import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img from '@/assets/images/hero.jpg';
function HeroSection({
  title,
  home,
  section,
  href,
  dir,
}: {
  title: string;
  home: string;
  dir: string;
  section: string;
  href: string;
}) {
  return (
    <section className="relative flex h-52 w-[100hw] flex-col items-center justify-center bg-cover" style={{backgroundImage:`url(${img.src})`}}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="z-10 mb-4">
        <h3 
          className="font-Allura mb-4 text-center text-4xl text-white md:text-5xl"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          {title}
        </h3>
        <Breadcrumb 
          dir={dir}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <BreadcrumbList className="justify-center">
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-sub text-white" href="/">
                {home}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              {dir === "ltr" ? <ChevronRight /> : <ChevronLeft />}
            </BreadcrumbSeparator>
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