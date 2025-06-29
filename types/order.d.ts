interface OrdersResponse {
  data: (Order|Reservation)[];
  links: Links;
  meta: Meta;
  status: string;
  message: string;
}

interface Order {
  id: number;
  type:'order';
  order_num: string;
  status: string;
  status_trans: string;
  order_type: string;
  is_schedule: boolean;
  address: Address;
  is_payment: boolean;
  pay_type: PayType[];
  order_date: string;
  order_time: string;
  store: Store;
  item: Item[];
  item_count: number;
  price_detail: PriceDetail;
  call_center: string;
  call_center_message: string;
  can_cancel: boolean;
  cancel_reason: null;
  desc_cancel_reason: null;
  driver: null;
  order_status?: OrderStatus[];
}
interface OrderStatus {
  key: string;
  value: string;
  status: string;
  icon: string;
}

interface Address {
  id: number;
  type: string | null;
  title: string;
  lat: string;
  lng: string;
  desc: string;
  is_default: boolean;
  building: string;
  floor: string;
  apartment: string;
  created_at: string;
}

interface PayType {
  wallet?: number;
  // Add other payment types if they can appear here (e.g., "cash": number)
}

interface Store {
  id: number;
  image: string;
  name: string;
  complete_name: string;
  phone: string;
  phone_code: string;
  logo: string | null;
  lat: number;
  lng: number;
  location_description: string;
  location_info: string | null;
  order_type: OrderType;
  payment_method: PaymentMethod[];
}

interface OrderType {
  web_delivery: boolean;
  web_take_away: boolean;
  app_delivery: boolean;
  app_take_away: boolean;
}

interface PaymentMethod {
  id: number;
  main_type: string;
  type: string;
}

interface Item {
  id: number;
  name:string
  product: Product;
  quantity: number;
  total_price: number;
  note: string | null;
  //combo: any[]; 
  sub_modifiers: SubModifier[];
  is_rate: boolean;
  review: string | null;
}

interface OrderSummary {
  title: string;
  currency: string;
  items: {
    label: string | React.ReactNode;
    value: number;
  }[];
  totalAmount: {
    label: string;
    value: number;
  };
}
interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Reservation {
  type: "reservation";
  id: number;
  call_center: string;
  created_at: string;
  currency: string;
  date: string;
  from_time: string;
  guests_number: number;
  name: string;
  reservation_fee: string;
  status: string; 
  store: Store;
  to_time: string;
  total_amount: string;
  type: string;
  value_per_person: string;
}