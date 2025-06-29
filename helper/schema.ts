
import * as z from "zod";
import { useTranslations } from "next-intl";

type Translator = ReturnType<typeof useTranslations>;
export const createRegisterFormSchema = ({ t, currentPhoneLimit }: { t: Translator, currentPhoneLimit: number | null }) => z
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
    t: Translator;
}) => z.object({
    password: z
        .string()
        .min(1, t("requiredField", { field: t("labels.newPassword") }))
        .min(8, t("passwordTooShort")),
    password_confirmation: z
        .string()
        .min(1, t("requiredField", { field: t("labels.confirmPassword") })),
});
export const OTPSchema = ({ t }: { t: Translator }) => z.object({ reset_code: z.string().min(4, t("passwordTooShort")) })
export const loginSchema = ({ t, currentPhoneLimit }: { t: Translator, currentPhoneLimit: number | null }) => z.object({
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
    ({ t, currentPhoneLimit }: { t: Translator, currentPhoneLimit: number | null }) =>
        z.object({
            name: z.string().min(1, t("requiredField", { field: t("labels.fullName") }))
                .max(50, t("errors.nameTooLong")),
            store_id: z.string().min(1, t("requiredField", { field: t("labels.store") })),
            phone_code: z.string().min(1, t("requiredField", { field: t("labels.phoneCode") })),
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
    t: Translator;
    currentPhoneLimit: number | null;
}) =>
    z.object({
        full_name: z.string().min(1, { message: t("errors.fullNameRequired") }),
        phone_code: z.string().min(1, t("requiredField", { field: t("labels.phoneCode") })),
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
    t: Translator;
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
export const profileSchema = ({ t }: { t: Translator }) => z.object({
    full_name: z
        .string()
        .min(1, t("requiredField", { field: t("labels.fullName") }))
        .max(50, t("errors.nameTooLong")),
    phone_code: z
        .string()
        .min(1, t("requiredField", { field: t("labels.phoneCode") })),
    phone: z.string(),
    email: z
        .string()
        .min(1, t("requiredField", { field: t("labels.email") }))
        .email(t("errors.invalidEmail")),
    address: z
        .string()
        .min(1, t("requiredField", { field: t("labels.address") }))
        .max(100, t("errors.addressTooLong")),
    avatar: z.string().optional()
});
export const checkoutSchema = () => z
    .object({
        order_type: z.enum(["delivery", "take_away"], {
            required_error: "You need to select an order type.",
        }),
        is_schedule: z.enum(["1", "0"], {
            required_error: "You need to select an order schedule option.",
        }),
        order_date: z.date().optional(),
        order_time: z.string().optional(),
        pay_type: z.enum(["1", "0","2"], {
            required_error: "You need to select a payment method.",
        }),
        address_id: z.number().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.is_schedule === "1") {
            if (!data.order_date) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Date is required for scheduled orders.",
                    path: ["order_date"],
                });
            }
            if (!data.order_time) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Time is required for scheduled orders.",
                    path: ["order_time"],
                });
            }
        }

        if (data.order_type === "delivery") {
            if (!data.address_id) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Shipping address is required for delivery orders.",
                    path: ["address_id"],
                });
            }
        }
    });

export const addressSchema = ({ t }: { t: Translator }) => z.object({
    title: z.string().min(1, t("requiredField", { field: t("labels.title") })),
    lat: z.string()
        .min(1, t("requiredField", { field: t("labels.latitude") }))
        .refine(
            (val) => {
                const num = parseFloat(val);
                return !isNaN(num) && num >= -90 && num <= 90;
            },
            t("errors.latitudeRange")
        ),
    lng: z.string()
        .min(1, t("requiredField", { field: t("labels.longitude") }))
        .refine(
            (val) => {
                const num = parseFloat(val);
                return !isNaN(num) && num >= -180 && num <= 180;
            },
            t("errors.longitudeRange")
        ),
    desc: z.string().min(1, t("requiredField", { field: t("labels.description") })),
    is_default: z.boolean().optional(),
    building: z.string()
        .regex(/^[0-9]*$/, t("errors.buildingNumberInteger"))
        .optional()
        .default(""),
    floor: z.string()
        .regex(/^[0-9]*$/, t("errors.floorNumberInteger"))
        .optional()
        .default(""),
    apartment: z.string()
        .regex(/^[0-9]*$/, t("errors.apartmentNumberInteger"))
        .optional()
        .default(""),
});
export type AddressSchemaType = z.infer<ReturnType<typeof addressSchema>>;

export type ContactFormType = z.infer<ReturnType<typeof contactFormSchema>>;
export type OTPSchemaType = z.infer<ReturnType<typeof OTPSchema>>;
export type PhoneFormType = z.infer<ReturnType<typeof phoneSchema>>;
export type RegisterFormType = z.infer<ReturnType<typeof createRegisterFormSchema>>
export type ForgatPasswordFormType = z.infer<ReturnType<typeof ForgatPasswordSchema>>
export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>
export type ReservationFromType = z.infer<ReturnType<typeof reservationSchema>>
export type profileFromType = z.infer<ReturnType<typeof profileSchema>>
export type CheckoutFromType = z.infer<ReturnType<typeof checkoutSchema>>

