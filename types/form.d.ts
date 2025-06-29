

interface SubmissionResult {
  data: unknown;
  message: string;
  status?: string;
}
interface OtpFormValues extends FieldValues {
  phone_code: string;
  phone: string;
  reset_code: string;
}
interface ApiErrorResponseData {
  message?: string;
  messages?: {
    [key: string]: string[];
  };
}
interface CountryCodeData {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}

interface Country {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}