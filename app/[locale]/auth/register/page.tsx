import AuthPageLayout from "@/components/auth/AuthComponent";
import { getTranslations } from "next-intl/server";
import RegisterForm from "@/components/auth/Register";
const RegisterPage = async() => {
  const t = await getTranslations();
  return (
    <AuthPageLayout
      title={t("login.welcomeBack")}
    >
      <RegisterForm />
    </AuthPageLayout>
  );
};

export default RegisterPage;
