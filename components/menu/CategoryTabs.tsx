"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";

interface CategoryTabsProps {
  categories: string[];
  category?: string;
  className?: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  category,
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState(category);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`);
    setActiveCategory(category);
  };
  return (
    <div
      className={
        "scrollbar-hide mb-6 flex w-full justify-center space-x-2 overflow-x-auto rounded-full p-1 " +
        className
      }
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "ghost"}
          className={`border-primary/10 !h-10 min-w-16 rounded-full border-1 px-4 text-sm font-medium whitespace-nowrap transition-colors duration-200`}
          onClick={() => handleClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;
