import image1 from "@/assets/images/imgeSection/1.jpg";
import image2 from "@/assets/images/imgeSection/2.jpg";
import image3 from "@/assets/images/imgeSection/3.jpg";
import image4 from "@/assets/images/imgeSection/4.jpg";
import image5 from "@/assets/images/imgeSection/5.jpg";
import Image from "next/image";

function ImagesSection() {
  const images = [
    { img: image1, span: false },
    { img: image2, span: false },
    { img: image3, span: false },
    { img: image5, span: false },
    { img: image4, span: true },
  ];
  return (
    <section>
      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((img, index) => (
          <div
            key={index}
            className={`${img.span ? "col-span-2 hidden md:block" : ""}`}
          >
            <Image
              src={img.img}
              alt={`secion image ${index}`}
              className="h-[380px] w-full bg-cover"
              width={100}
              height={100}
            />
          </div>
        ))}
        <div className="bg-primary absolute top-[50%] left-[50%] size-56 -translate-[50%] rounded-full flex justify-center items-center">
          <p className="text-backgroud text-2xl text-center">follow us on instagram</p>
        </div>
      </div>
    </section>
  );
}

export default ImagesSection;
