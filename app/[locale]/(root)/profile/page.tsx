import ProfileForm from "@/components/profile/ProfileForm";
import { getProfile } from "@/services/ApiHandler";

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
