import AuthPageLayout from "@/components/auth/AuthComponent";
import { getTranslations } from "next-intl/server";
import VerifyPhoneForm from "@/components/auth/VirifyCodeForm";
const VerificationPage = async() => {
  const t = await getTranslations();
  return (
    <AuthPageLayout
      title={t("login.welcomeBack")}
      instructions={t("login.instructions")}
    >
      <VerifyPhoneForm />
    </AuthPageLayout>
  );
};

export default VerificationPage;
