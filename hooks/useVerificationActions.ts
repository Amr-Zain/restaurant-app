import { useCallback, useState } from "react";
import {
    forgotPassword,
    sendProfileVerificationCode,
    updatePhone,
    verifyForgotPassword,
} from "@/services/ClientApiHandler";
import { appStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";

interface ResendCodeData {
    phone_code: string;
    phone: string;
}

interface VerifyCodeData extends ResendCodeData {
    reset_code: string;
}

export const useVerificationActions = (
    isProfile: boolean,
    onClose?: () => void
) => {
    const [isLoading, setIsLoading] = useState(false);
    const verify = appStore((state) => state.verify);
    const setVerify = appStore((state) => state.setVerify);
    const setUser = useAuthStore((state) => state.setUser);

    const resendCode = useCallback(async (data: ResendCodeData) => {
        setIsLoading(true);
        try {
            const response = isProfile
                ? await sendProfileVerificationCode(data)
                : await forgotPassword(data);
            return response;
        } finally {
            setIsLoading(false);
        }
    }, [isProfile]);

    const verifyCode = useCallback(async (formData: VerifyCodeData) => {
        setVerify({ ...verify, resetCode: formData.reset_code });

        if (isProfile) {
            onClose?.();
            const response = await updatePhone(formData);
            if (response.status === 'success') {
                setVerify({ ...verify, updated: true });
            }
            return response;
        }

        const endpoint = verify.type === "register"
            ? "verify_phone"
            : "verify_forgot_password_code";

        return await verifyForgotPassword(formData, endpoint);
    }, [isProfile, onClose, verify, setVerify]);

    const onVerifySuccess = useCallback((response: unknown) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (response.status === "success" && verify.type === "register") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setUser(response.data as User);
        }
    }, [verify.type, setUser]);

    return {
        isLoading,
        resendCode,
        verifyCode,
        onVerifySuccess,
        verify,
        setVerify,
    };
};