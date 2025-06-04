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
}: {
    t: any;
}) => z.object({
    password: z
        .string()
        .min(1, t("requiredField", { field: t("labels.newPassword") }))
        .min(8, t("passwordTooShort")),
    password_confirmation: z
        .string()
        .min(1, t("requiredField", { field: t("labels.confirmPassword") })),
});
export const OTPSchema = ({ t }:{t:any}) => z.object({ reset_code: z.string().min(4, t("passwordTooShort")) })
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
export const reservationSchema =
    ({ t, currentPhoneLimit }: { t: any, currentPhoneLimit: number | null }) =>
        z.object({
            name: z.string().min(2, {
                message: t("validation.nameMin"),
            }),
            store_id: z.string().min(1, {
                message: t("validation.storeRequired"),
            }),
            phone_code: z.string().min(1, { message: t("validation.phoneCodeRequired") }),
            phone: z
                .string()
                .min(1, { message: t("validation.phoneRequired") })
                .max(
                    currentPhoneLimit ?? 15,
                    { message: t("validation.phoneMax", { count: currentPhoneLimit ?? 15 }) }
                ),
            guests_number: z.string({
                required_error: t("validation.guestsRequired"),
            }),
            date: z.date({
                required_error: t("validation.dateRequired"),
            }),
            from_time: z.string({
                required_error: t("validation.fromTimeRequired"),
            }),
            to_time: z.string({
                required_error: t("validation.toTimeRequired"),
            }),
        })
export const contactFormSchema = ({
    t,
    currentPhoneLimit,
}: {
    t: any;
    currentPhoneLimit: number | null;
}) =>
    z.object({
        full_name: z.string().min(1, { message: t("errors.fullNameRequired") }),
        phone_code: z.string().min(1, { message: t("errors.phoneCodeRequired") }),
        phone: z
            .string()
            .min(1, { message: t("errors.phoneRequired") })
            .refine(
                (value) => {
                    if (currentPhoneLimit && value.length !== currentPhoneLimit) {
                        return false;
                    }
                    return true;
                },
                {
                    message: t("errors.phoneInvalidLength", { length: currentPhoneLimit }),
                },
            ),
        message_type: z.string().min(1, { message: t("errors.messageTypeRequired") }), // For the dropdown
        message: z
            .string()
            .min(1, { message: t("errors.messageRequired") })
            .max(500, { message: t("errors.messageTooLong", { max: 500 }) }), // Example: Max length for message
    });
export const phoneSchema = ({
    t,
    currentPhoneLimit,
}: {
    t: any;
    currentPhoneLimit: number | null;
}) => z.object({
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
});
export type ContactFormType = z.infer<ReturnType<typeof contactFormSchema>>;
export type OTPSchemaType = z.infer<ReturnType<typeof OTPSchema>>;
export type PhoneFormType = z.infer<ReturnType<typeof phoneSchema>>;
export type RegisterFormType = z.infer<ReturnType<typeof createRegisterFormSchema>>
export type ForgatPasswordFormType = z.infer<ReturnType<typeof ForgatPasswordSchema>>
export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>
export type ReservationFromType = z.infer<ReturnType<typeof reservationSchema>>

