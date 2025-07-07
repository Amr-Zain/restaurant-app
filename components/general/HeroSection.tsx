import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";
import img from '@/assets/images/hero.jpg';

import { FadeIn } from "@/components/animations";

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
    <section className="relative flex h-52 w-[100hw] flex-col items-center justify-center bg-cover" style={{ backgroundImage: `url(${img.src})` }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="z-10 mb-4">
        <FadeIn
          direction="down"
          delay={0.1}
          className="font-Allura mb-4 text-center text-4xl text-white md:text-5xl"
        >
          <h3>
            {title}
          </h3>
        </FadeIn>

        <FadeIn
          direction="up"
          delay={0.2}
        >
          <Breadcrumb
            dir={dir}
          >
            <BreadcrumbList className="justify-center">
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-sub text-white" href="/">
                  {home}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronLeft className="ltr:rotate-180" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-sub text-white" href={href}>
                  {section}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </FadeIn>
      </div>
    </section>
  );
}

export default HeroSection;