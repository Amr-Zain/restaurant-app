interface General {
    title: string,
    id: string;
    name: string;
    desc: string;
    content: string;
    image: string;
}
interface User {
    id: number;
    full_name: string;
    avatar: string;
    email: string;
    phone_code: string;
    phone: string;
    user_type: string; //"customer"
    notifiable: boolean;
    token: string;
}
interface Branch  {
  id: number;
  image: string;
  name: string;
  phone: string;
  phone_code: string;
  lat: number;
  lng: number;
  location_description: string;
}
interface CMSPage {
  id: number;
  title: string;
  slug: string;
  in_menu: boolean;
  icon: string;
  user_type: "both" | "customer" | "admin"; 
  created_at: string;
}
interface AdditionData {
  id: number;
  image: string;
  heading: string;
  desc: string;
  created_at: string;
}

interface CmsPageContent {
  id: number;
  image: string;
  icon: string;
  user_type: string;
  slug: string;
  heading: string;
  title: string;
  desc: string;
  addition_data?: AdditionData[];
  created_at: string;
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
interface Topping {
    name: string;
    price: number | null;
    quantity: number;
    weight: number;
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
