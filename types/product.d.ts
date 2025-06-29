
interface Product {
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

interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

interface ProductPrice {
  price: number;
  currency: string;
  percentage: number;
  discount_value: number;
  price_after: number;
  offer: Offer;
}

interface Offer {
  id: number;
  from_day: string | null;
  to_day: string | null;
  from_time: string | null;
  to_time: string | null;
}


interface ItemModifierPrice {
  price: number;
  currency: string;
}

interface ProductImage {
  id: number;
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


interface ProductReviewsResponse {
  data: Review[];
  status: string;
  message: string;
  review_count: number;
  rate: number;
  star_rate: StarRate[];
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