import AuthPageLayout from "@/components/auth/AuthComponent";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { getTranslations } from "next-intl/server";
const VerificationPage = async() => {
  const t = await getTranslations();
  return (
    <AuthPageLayout
      title={t("login.welcomeBack")}
      instructions={t("login.instructions")}
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
};

export default VerificationPage;
