interface ProductImage {
  id: number;
  image: string;
}
interface Notification {
  body: string;
  id: number;
  image: string | null;
  notify_id: number;
  notify_type: "order" | 'reservation';
  read_at: string;
  time_ago: string;
  title: string;
}
interface KeyValueItem<T = unknown> {
  key: string;
  value: T;
}

interface WebsiteData {
  website_colors: KeyValueItem<string>[];
  website_customization: KeyValueItem<boolean | string>[];
  website_setting: KeyValueItem<string>[];
  contact_us: KeyValueItem<unknown>[];
  payment_methods: KeyValueItem<boolean>[];
}

interface TransformedWebsiteData {
  website_colors: Record<string, string>;
  website_customization: Record<string, boolean | string>;
  website_setting: Record<string, string>;
  contact_us: Record<string, any>;
  payment_methods: Record<string, boolean>;
}
interface Reservation {
  id: number;
  name: string;
  phone_code: string;
  phone: string;
  store: Branch;
  guests_number: number;
  date: string;
  from_time: string;
  to_time: string;
  status: string;
  value_per_person: string;
  total_amount: string;
  is_paid: boolean;
  currency: string;
}
interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

interface PriceDetails {
  price: number;
  currency: string;
  percentage?: number;
  discount_value?: number;
  price_after?: number;
  offer?: {
    id: number;
    from_day: string | null;
    to_day: string | null;
    from_time: string | null;
    to_time: string | null;
  };
}

interface ItemModifier {
  id: number;
  name: string;
  image: string;
  price: PriceDetails | null;
}

interface SubModifier {
  id: number;
  name: string;
  selections_type: "exact" | "min_max";
  min_num_of_selection: number | null;
  max_num_of_selection: number | null;
  item_modifiers: ItemModifier[];
}

interface ProductSeo {
  url: string;
  description: string;
  keywords: string;
}

interface ProductData {
  id: number;
  name: string;
  slug: string;
  desc: string;
  type: string;
  image: string;
  images: ProductImage[];
  food_icon: FoodIcon[];
  rating: number;
  review_count: number;
  rate: number;
  is_favourite: boolean;
  favourite_id: number | null;
  price: PriceDetails;
  seo: ProductSeo;
  combo: [];
  sub_modifiers: SubModifier[];
}

interface PriceDetails {
  price: number;
  currency: string;
  percentage: number;
  discount_value: number;
  price_after: number;
  offer: null;
}

interface Product {
  id: number;
  favourite_id: number;
  slug: string
  name: string;
  slug: string;
  desc: string | null;
  type: string;
  image: string;
  rating: number;
  review_count: number;
  rate: number;
  is_favourite: boolean;
  //favourite_id: number | null; 
  price: PriceDetails;
}
interface Address {
  id: number;
  title: string;
  desc: string;
  lat: number;
  lng: number
  type: string;
  building: number;
  floor: number;
  apartment: number;
  is_default: boolean;
}
interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};
interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

interface User {
  avatar: string;
  country: Country;
  default_address: Address;
  email: string;
  full_name: string;
  id: number;
  notifiable: boolean;
  phone: string;
  phone_code: string;
  points: number;
  tenant: string;
  token: string;
  user_type: string;
  wallet: number;
}

interface Branch {
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
interface HomePageData {
  //address: any; 
  offers: Product[];
  popular_products: Product[];
  products: Product[]
  sliders: { image: string; title: string; desc: string; id: number }[];
  subscription_content: {
    image?: string | StaticImageData;
    title: string;
    heading?: string;
    desc: string;
    desc2?: string;
  };
  web_content: {
    id: number;
    title: string;
    desc: string;
    image: string;
  };
  web_content_link: {
    id: number;
    title: string;
    desc: string;
    google_play: string;
    app_store: string;
    image: string; // Assuming there's an image property based on common patterns, though not explicitly in your sample
  };
}
interface Country {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}

interface Review {
  id: number;
  rate: number;
  review: string;
  note: string;
  created_at: string;
  user: User;
}

interface StarRate {
  key: string;
  value: number;
}

interface ProductReviewsResponse {
  data: Review[];
  status: string;
  message: string;
  review_count: number;
  rate: number;
  star_rate: StarRate[];
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

interface MenuSubcategory {
  id: number;
  name: string;
  image: string;
}
interface Transaction {
  amount: number;
  created_at: string; 
  id: number;
  image: string;
  status: "come_in" | "come_out"; 
  title: string; 
  points: numbe;
}
interface Wallet {
  id: number;
  currency?: string;
  bending_balance?: number;
  points?: number;
  transactions: Transaction[];
}
interface MenuCategory {
  id: number;
  name: string;
  image: string;
  icon: string;
  subcategories: MenuSubcategory[];
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
