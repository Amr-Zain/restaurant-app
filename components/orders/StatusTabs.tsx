"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl"; 

interface CategoryTabsProps {
  categories: string[];
  category?: string;
  className?: string;
  status?: boolean;
}

const StatusTabs: React.FC<CategoryTabsProps> = ({
  categories,
  category,
  className,
  status,
}) => {
  const [activeCategory, setActiveCategory] = useState(category);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations(); 

  const handleClick = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.delete("status");
      let statusKey = "";
      switch (cat) {
        case t("categories.all"):
          statusKey = "all";
          break;
        case t("categories.pending"):
          statusKey = "pending";
          break;
        case t("categories.completed"):
          statusKey = "completed";
          break;
        case t("categories.cancelled"):
          statusKey = "cancelled";
          break;
        default:
          statusKey = cat.toLowerCase(); 
      }
      params.set("status", statusKey);
      replace(`${pathname}?${params.toString()}`);
      setActiveCategory(cat);
      return;
    }
    params.delete("category");
    params.set("category", cat.toLowerCase());
    replace(`${pathname}?${params.toString()}`);
    setActiveCategory(cat);
  };

  return (
    <div
      className={
        "scrollbar-hide mb-6 flex w-full justify-center space-x-2 overflow-x-auto rounded-full p-1 " +
        className
      }
    >
      {categories.map((cat) => ( // Renamed 'category' to 'cat'
        <Button
          key={cat}
          variant={
            activeCategory?.toLowerCase() === cat.toLowerCase()
              ? "default"
              : "ghost"
          }
          className={`!h-10 min-w-16 cursor-pointer rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${activeCategory?.toLowerCase() === cat.toLowerCase() ? "text-white" : "text-sub"}`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};
export default StatusTabs;