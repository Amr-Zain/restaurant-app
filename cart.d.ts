
interface ProductPrice {
  price: number;
  currency: string;
  percentage: number;
  discount_value: number;
  price_after: number;
  offer: {
    id: number;
    from_day: string | null;
    to_day: string | null;
    from_time: string | null;
    to_time: string | null;
  };
}

interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

interface ProductDetails {
  id: number;
  name: string;
  slug: string;
  desc: string;
  type: string;
  image: string;
  food_icon: FoodIcon[];
  rating: number;
  review_count: number;
  rate: number;
  is_favourite: boolean;
  favourite_id: number;
  price: ProductPrice;
}

interface ItemModifier {
  id: number;
  in_store: boolean;
  cart_product_id: number;
  price: {
    price: number;
    currency: string;
  } | null;
  name: string;
  image: string;
  quantity: number| undefined;
}

interface SubModifier {
  id: number;
  name: string;
  selections_type: string;
  min_num_of_selection: number;
  max_num_of_selection: number;
  item_modifiers: ItemModifier[];
}

interface CartProduct {
  id: number;
  in_store: boolean;
  product: ProductDetails;
  quantity: number;
  total_price: number;
  note: string | null;
  combo: unknown[]; 
  sub_modifiers: SubModifier[];
}

interface PriceSummary {
  tax_rate_percentage: number;
  tax_rate_value: number;
  sun_total: number;
  surcharge: number;
  coupon_price: number;
  delivery_price: number;
  total: number;
}

interface CartData {
  id: number;
  guest_token: string | null;
  store: Store;
  products: CartProduct[];
  item_count: number;
  points: number;
  wallet: number;
}

interface CartApiResponse {
  data: CartData;
  status: string;
  message: string;
  auto_coupon: boolean;
  hint: string | null;
  coupon_code: string | null;
  currency: string;
  have_delivery: boolean;
  price: PriceSummary;
}