'use client';

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldPath, FieldValues } from "react-hook-form";
import { useRouter } from "@/i18n/routing";

interface UseFormSubmissionOptions<TFormValues extends FieldValues> {
    submitFunction: (values: TFormValues) => Promise<SubmissionResult>;
    onSuccessPath?: string;
    successMessageKey?: string;
    errorMessageKey?: string;
    preserveFormValues?: boolean;
    onSuccess?: (result: SubmissionResult) => void;
}

export const useFormSubmission = <TFormValues extends FieldValues>(
    form: ReturnType<typeof useForm<TFormValues>>,
    options: UseFormSubmissionOptions<TFormValues>,
) => {
    const router = useRouter();
    const {
        submitFunction,
        onSuccessPath,
        successMessageKey,
        errorMessageKey,
        onSuccess
    } = options;

    const handleSubmit = async (values: TFormValues): Promise<SubmissionResult> => {
        try {
            const result = await submitFunction(values);

            toast.success(result?.message || successMessageKey || "Operation successful!");
            if (onSuccess) {
                onSuccess(result);
            }
            if (onSuccessPath) {
                router.push(onSuccessPath);
            }

            return result;
        } catch (error: unknown) {
            console.error("Submission error:", error);

            let messageToShow = errorMessageKey || "An unexpected error occurred";

            if (
                typeof error === 'object' && error !== null &&
                'response' in error && typeof (error as { response: unknown }).response === 'object' &&
                (error as { response: { data?: ApiErrorResponseData } }).response?.data
            ) {
                const errorResponseData = (error as { response: { data: ApiErrorResponseData } }).response.data;

                if (errorResponseData.messages) {
                    Object.keys(errorResponseData.messages).forEach((key) => {
                        if (form.getFieldState(key as FieldPath<TFormValues>, form.formState).isTouched) {
                            form.setError(key as FieldPath<TFormValues>, {
                                type: "server",
                                message: errorResponseData.messages![key][0],
                            });
                        }
                    });
                    messageToShow = errorResponseData.message || messageToShow;
                } else if (errorResponseData.message) {
                    messageToShow = errorResponseData.message;
                }
            } else if (error instanceof Error) {
                messageToShow = error.message;
            } else if (typeof error === 'string') {
                messageToShow = error;
            }

            toast.error(messageToShow);
            form.setError("root", {
                type: "manual",
                message: messageToShow,
            });

            throw error;
        }
    };

    return { handleSubmit };
};