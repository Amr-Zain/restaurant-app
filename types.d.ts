interface General {
    title: string,
    id: string;
    name: string;
    desc: string;
    content: string;
    image: string;
}
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


interface Features {
    name: string;
    desc: string;
    image: string;
    id: number
}

interface Page {
    title: string;
    content: string;
}
interface Service {
    icon: string;
    color: string;
    title: string;
    desc: string;
    service_slug: string;
    id: number
}

interface MiddleIntro extends Page {
    button_name: string;
    video: string;
}

interface HomeType {
    features: Features[];
    top_intro: TopIntro;
    middle_intro: MiddleIntro;
    services: Service[];
    technology: Features[]
    partners: Features[]
    visions: General[]
}

interface Section {
    type: string
    id: number;
    title: string;
    desc: string;
    background: string;
    image: string;
    features: {
        id: number;
        title: string;
        desc: string;
        icon: string
    }[];
}

interface ServiceType {
    title: string;
    desc: string;
    image: string;
    video: string;
    background: string;
    icon: string;
    sub_title: string;
    sub_desc: string;
    name: string;
    type: string;
    sections: Section[]
}
