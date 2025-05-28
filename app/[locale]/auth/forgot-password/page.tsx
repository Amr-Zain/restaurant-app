import AuthPageLayout from "@/components/auth/AuthComponent";
import { getTranslations } from "next-intl/server";
import ChangePasswordForm from "@/components/auth/ChangePassword";
const RegisterPage = async() => {
  const t = await getTranslations();
  return (
    <AuthPageLayout
      title={t("login.welcomeBack")}
      instructions={t("login.instructions")}
    >
      <ChangePasswordForm />
    </AuthPageLayout>
  );
};

export default RegisterPage;
