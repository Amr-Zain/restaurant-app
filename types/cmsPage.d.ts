
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