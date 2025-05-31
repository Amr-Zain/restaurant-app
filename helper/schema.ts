import * as z from "zod";

export const createRegisterFormSchema = ({ t, currentPhoneLimit }: { t: any, currentPhoneLimit: number | null }) => z
    .object({
        full_name: z
            .string()
            .min(1, t("requiredField", { field: t("labels.fullName") }))
            .max(50, t("errors.nameTooLong")),
        phone_code: z
            .string()
            .min(1, t("requiredField", { field: t("labels.phoneCode") })),
        phone: z
            .string()
            .min(1, t("requiredField", { field: t("labels.phoneNumber") }))
            .regex(/^[0-9]+$/, t("invalidPhoneNumber"))
            .refine(
                (val) => {
                    if (currentPhoneLimit === null || val === "") return true;
                    return val.length === currentPhoneLimit;
                },
                () => ({
                    message: t("errors.phoneNumberLength", { length: currentPhoneLimit }),
                })
            ),
        email: z
            .string()
            .min(1, t("requiredField", { field: t("labels.email") }))
            .email(t("errors.invalidEmail")),
        password: z
            .string()
            .min(1, t("requiredField", { field: t("labels.password") }))
            .min(8, t("passwordTooShort")),
        password_confirmation: z
            .string().default('dfskljdfsjd')
    /* .min(1, t("requiredField", { field: t("labels.confirmPassword") })) */.optional(),
    })
   /*  .refine((data) => data.password === data.password_confirmation, {
        message: t("errors.passwordMismatch"),
        path: ["password_confirmation"],
    }); */
export const ForgatPasswordSchema = ({
    t,
    currentPhoneLimit
}: {
    t: any;
    currentPhoneLimit: number | null;
}) => z.object({
    reset_code: z.string().default(""), // Always string, never undefined
    phone_code: z
        .string()
        .min(1, t("requiredField", { field: t("labels.phoneCode") })),
    phone: z
        .string()
        .min(1, t("requiredField", { field: t("labels.phoneNumber") }))
        .regex(/^[0-9]+$/, t("invalidPhoneNumber"))
        .refine(
            (val) => {
                if (currentPhoneLimit === null || val === "") return true;
                return val.length === currentPhoneLimit;
            },
            () => ({
                message: t("errors.phoneNumberLength", { length: currentPhoneLimit }),
            }),
        ),
    password: z
        .string()
        .min(1, t("requiredField", { field: t("labels.newPassword") }))
        .min(8, t("passwordTooShort")),
    password_confirmation: z
        .string()
        .min(1, t("requiredField", { field: t("labels.confirmPassword") })),
});
export const loginSchema = ({ t, currentPhoneLimit }: { t: any, currentPhoneLimit: number | null }) => z.object({
    phone_code: z
        .string()
        .min(1, t("requiredField", { field: t("labels.phoneCode") })),
    phone: z
        .string()
        .min(1, t("requiredField", { field: t("labels.phoneNumber") }))
        .regex(/^[0-9]+$/, t("invalidPhoneNumber"))
        .refine(
            (val) => {
                if (currentPhoneLimit === null || val === "") return true;
                return val.length === currentPhoneLimit;
            },
            () => ({
                message: t("errors.phoneNumberLength", { length: currentPhoneLimit }),
            }),
        ),
    password: z
        .string()
        .min(1, t("requiredField", { field: t("labels.password") }))
        .min(8, t("passwordTooShort")),
    rememberMe: z.boolean().default(false).optional(),
});
export type RegisterFormType = z.infer<ReturnType<typeof createRegisterFormSchema>>
export type ForgatPasswordFormType = z.infer<ReturnType<typeof ForgatPasswordSchema>>
export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>

