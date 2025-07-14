import ProfileForm from "@/components/profile/ProfileForm";
import { getProfile, getSettingsData } from "@/services/ApiHandler";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const websiteSetting = (await getSettingsData()).website_setting;
    const t = await getTranslations();
    return {
      title: `${t('profile.title')} - ${websiteSetting.website_title}`,
    };
  } catch {
    return {};
  }
}
async function Profile() {
  const profileData = await getProfile();
  return (
 
    <div className="container">
      <ProfileForm
        defaultValues={{
          full_name: profileData.full_name,
          phone_code: profileData.country.phone_code,
          phone: profileData.phone,
          email: profileData.email,
          address: profileData.default_address?.title,
          avatar: profileData.avatar,
        }}
        />
    </div>
  );
}

export default Profile;
