import image1 from "@/assets/images/imgeSection/1.jpg";
import image2 from "@/assets/images/imgeSection/2.jpg";
import image3 from "@/assets/images/imgeSection/3.jpg";
import image4 from "@/assets/images/imgeSection/4.jpg";
import image5 from "@/assets/images/imgeSection/5.jpg";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const images = [
  { img: image1, span: false },
  { img: image2, span: false },
  { img: image3, span: false },
  { img: image4, span: true },
  { img: image5, span: false },
];

async function ImagesSection() {
  const t = await getTranslations();
  return (
    <section>
      <div className="relative my-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((img, index) => (
          <div
            key={index}
            className={`${img.span ? "col-span-2 hidden md:block" : ""}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <Image
              src={img.img}
              alt={`section image ${index + 1}`}
              className="h-[220px] w-full object-cover sm:h-[380px]"
              width={100}
              height={100}
            />
          </div>
        ))}
        <div
          className="bg-primary absolute top-[50%] left-[50%] flex size-36 -translate-x-[50%] -translate-y-[50%] items-center justify-center rounded-full sm:size-56"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <p className="text-background text-center text-lg sm:text-2xl">
            {t("TEXT.followInstgram")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ImagesSection;
