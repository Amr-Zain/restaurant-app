"use client";
import ChangePasswordForm from "./ChangePassword";
import PhoneForm from "./PhoneForm";
import { useAuthStore } from "@/stores/auth";

const ForgotPasswordForm = () => {
  const { phone, code, resetCode } = useAuthStore((state) => state.verify);

  if (resetCode && code && phone) return <ChangePasswordForm />;
  return <PhoneForm />;
};

export default ForgotPasswordForm;
