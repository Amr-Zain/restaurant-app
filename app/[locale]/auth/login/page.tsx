import LoginForm from "@/components/auth/loginform";
import AuthPageLayout from "@/components/auth/AuthComponent";
import { getTranslations } from "next-intl/server";
const LoginPage = async() => {
  const t = await getTranslations();
  return (
    <AuthPageLayout
      title={t("login.welcomeBack")}
      instructions={t("login.instructions")}
    >
      <LoginForm />
    </AuthPageLayout>
  );
};

export default LoginPage;
