"use client";

import { appStore } from "@/stores/app";
import ChangePasswordForm from "./ChangePassword";
import PhoneForm from "./PhoneForm";

const ForgotPasswordForm = () => {
  const { phone, code, resetCode } = appStore((state) => state.verify);

  if (resetCode && code && phone) return <ChangePasswordForm />;
  return <PhoneForm />;
};

export default ForgotPasswordForm;
