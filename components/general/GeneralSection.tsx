import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";

type Props = {
  item: {
    image: string | StaticImageData;
    title: string;
    heading?: string;
    desc: string;
    desc2?: string;
  };
  className?: string;
  to?: string;
  children?: React.ReactNode;
};

const GeneralSection = ({ ...props }: Props) => {
  return (
    <div className="bg-bottom-right bg-no-repeat">
      <div className="bg-position-[left_3rem_top] bg-no-repeat">
        <div
          className={
            "container grid grid-cols-1 items-center gap-10 bg-top-left bg-no-repeat md:grid-cols-2"
          }
        >
          <div className={"h-full w-full " + props.className}>
            <Image
              width={560}
              height={700}
              src={props.item.image}
              alt={props.item.title}
              className="animated wow fadeInLeft mx-auto h-[700px] max-h-full w-[560px] max-w-full rounded-t-[300px] rounded-b-[300px] object-cover"
              data-wow-duration="1.3s"
              data-wow-delay="0s"
            />
          </div>
          <div className="max-w-[600px] space-y-5 bg-bottom-right bg-no-repeat">
            {props.item.heading && (
              <div
                className="animated wow fadeInRight font-500 text-primary flex items-center gap-4 whitespace-nowrap uppercase"
                v-if="welcome"
                data-wow-duration="1.3s"
                data-wow-delay="0s"
              >
                {props.item.heading}
                <hr className="border-primary hidden w-[50%] md:flex" />
              </div>
            )}
            <h3
              className="animated wow fadeInRight text-4xl font-extrabold"
              data-wow-duration="1.3s"
              data-wow-delay="0s"
              dangerouslySetInnerHTML={{
                __html: props.item.title,
              }}
            ></h3>
            <div
              className="animated wow fadeInRight text-sub text-lg font-thin"
              data-wow-duration="1.3s"
              data-wow-delay="0s"
              dangerouslySetInnerHTML={{
                __html: props.item.desc,
              }}
            ></div>
            <div
              className="animated wow fadeInRight text-sub text-lg font-thin"
              data-wow-duration="1.3s"
              data-wow-delay="0s"
            >
              {props.item.desc2}
            </div>
            {props?.to && (
              <Link href={props.to}>
                <Button variant={"outline"} className="h-14 px-6 !py-4 text-lg">
                  Discover More
                </Button>
              </Link>
            )}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
