import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { getSettingsData } from "@/services/ApiHandler";
/* 
driver_tips
footer_main_part_availability
offers
schedule_orders
slider_availability
slider_multi_image
title_availability
top_bar_availability
top_bar_logo_position
*/

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSettingsData();
  console.log(data);

  return (
    <>
      {data.website_customization.top_bar_availability && (
        <NavBar
          logo={data.website_setting.website_logo}
          logoPosition={
            data.website_customization.top_bar_logo_position as string
          }
        />
      )}
      {children}
      <Footer
        desc={data.website_setting.footer_desc}
        logo={data.website_setting.website_logo}
        offers={data.website_customization.offers as string}
        phoneNumber={data.contact_us.phone_number[0]}
        email={data.contact_us.email[0] as string}
        mainPartAvailability={
          data.website_customization.footer_main_part_availability as boolean
        }
      />
    </>
  );
}
