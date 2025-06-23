import { useState, useEffect, useCallback } from "react";

const RESEND_TIMER_SECONDS = 60;

export const useResendTimer = () => {
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const resetTimer = useCallback(() => {
    setTimeLeft(RESEND_TIMER_SECONDS);
    setCanResend(false);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return { timeLeft, canResend, resetTimer };
};