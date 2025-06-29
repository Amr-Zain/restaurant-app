
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
  contact_us: Record<string, unknown>;
  payment_methods: Record<string, boolean>;
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
    image: string; 
  };
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
