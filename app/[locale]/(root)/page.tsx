import GeneralSection from "@/components/general/GeneralSection";
import img from "@/assets/images/login.jpg";
import phone from "@/assets/images/phone.png";
import appStore from "@/assets/images/appStore.png";
import googlePlay from "@/assets/images/googlePlay.png";
import drink from "@/assets/images/drink.jpg";
import SliderSection from "@/components/menu/MenuSliderSection";
import MenuCard from "@/components/menu/menuCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ImagesSection from "@/components/home/ImagesSections";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HomeSlider from "@/components/home/Slider";
import ReservationForm from "@/components/reservation/ReservationForm";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HomeSlider />
      <SliderSection
        title="View Our Menus"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard
            id="1"
            key={index}
            image={img}
            desc="Delicious food item with premium ingredients and authentic flavors"
            rating={4.5}
            price={200}
            title={`Menu Item ${index + 1}`}
          />
        ))}
      />

      <GeneralSection
        item={{
          title: "We Provide Good Food For Your Family!",
          heading: "HEY! WELCOME TO mea telecom",
          desc: `We see our customers as invited guests to a party, and we are the hosts.
         It's our job every day to make every important aspect of the customer experience a little bit better.
          Donec quam felis, ultricies nec, pellentesque eu.',heading:"Food is the foundation of true happiness.
           Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo.`,
          desc2: `We see our customers as invited guests to a party, and we are the hosts. 
           It's our job every day to make every important aspect of the customer experience a little bit better.
            Donec quam felis, ultricies nec, pellentesque eu.`,
          image: img,
        }}
        to={"/about-us"}
      />
      <SliderSection
        title="Popular Items"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard
            id="1"
            key={index}
            image={img}
            desc="Delicious food item with premium ingredients and authentic flavors"
            rating={4.5}
            price={200}
            title={`Menu Item ${index + 1}`}
          />
        ))}
      />
      <div className="mx-auto w-full sm:w-[90%]">
        <ReservationForm />
      </div>
      <GeneralSection
        item={{
          title: "Now It’s More Easy to Order by Our  App",
          desc: `All you need to do is downlode one of the best delivery apps, 
          make a and most companies are opting  for mobile app devlopment for food delivery`,
          image: phone,
        }}
        className="order-last"
      >
        <div className="flex gap-6">
          <Link href={"#"}>
            <Image
              src={appStore}
              alt={"app store link"}
              width={145}
              height={42}
            />
          </Link>
          <Link href={"#"}>
            <Image
              src={googlePlay}
              alt={"google paly link"}
              width={145}
              height={42}
            />
          </Link>
        </div>
      </GeneralSection>
      <ImagesSection />
      <SliderSection
        title="Offers"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard
            id="1"
            key={index}
            isOffer
            image={img}
            desc="Delicious food item with premium ingredients and authentic flavors"
            rating={4.5}
            price={200}
            title={`Menu Item ${index + 1}`}
            offPercentage={"25%"}
            oldPrice={50}
          />
        ))}
      />
      <GeneralSection
        item={{
          title: "Subcribe To Our Newsletter",
          desc: `Lorem ipsum dolor sit amet, consectetur adipidrscing elit. 
          Purus mauris sem sed urna venenatis vivamus. 
          Egestas in velit nulla viverra turpis id ac. Amet faucibus tempus.`,
          image: drink,
        }}
        className="mb-8"
      >
        <div className="relative">
          <Input
            type="email"
            placeholder="enter your email"
            className="h-16 rounded-full border-none bg-white shadow-none"
          />
          <Button className="absolute end-1 top-1 mb-6 font-bold">
            SUBCRIBE
          </Button>
        </div>
      </GeneralSection>
    </div>
  );
}
