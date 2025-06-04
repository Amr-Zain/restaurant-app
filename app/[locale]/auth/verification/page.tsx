import AuthPageLayout from "@/components/auth/AuthComponent";
import { getTranslations } from "next-intl/server";
import VerifyForm from "@/components/auth/VerifyForm";
const VerificationPage = async() => {
  const t = await getTranslations();
  return (
    <AuthPageLayout
      title={t("login.welcomeBack")}
      instructions={t("login.instructions")}
    >
      <VerifyForm />
    </AuthPageLayout>
  );
};

export default VerificationPage;
