
"use client";

import { useTranslations } from "next-intl";
import { formatTime } from "@/helper/functions";

interface ResendCodeSectionProps {
  timeLeft: number;
  canResend: boolean;
  isLoading: boolean;
  onResend: () => void;
}

const ResendCodeSection = ({
  timeLeft,
  canResend,
  isLoading,
  onResend,
}: ResendCodeSectionProps) => {
  const t = useTranslations();

  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <span className="text-gray-600">
        {t("verification.didntReceiveCode")}{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={isLoading || !canResend}
          className={`font-medium ${
            canResend
              ? "text-primary cursor-pointer hover:underline"
              : "cursor-not-allowed text-gray-400"
          }`}
        >
          {t("links.resend")}
        </button>
      </span>
      <span className="text-gray-600">{formatTime(timeLeft)}</span>
    </div>
  );
};
export default ResendCodeSection;
