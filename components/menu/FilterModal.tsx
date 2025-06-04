"use client";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import FilterSidebar from "./Sidebar";

const filterOptions = {
  mainCategories: ["Food", "Drink", "Dessert"],
  subCategories: {
    Food: ["Pizza", "Burger", "Pasta", "Salad", "Sushi", "Steak", "Soup"],
    Drink: ["Coffee", "Tea", "Juice", "Soda", "Water"],
    Dessert: ["Cake", "Ice Cream", "Pastry", "Cookies", "Brownie"],
  },
};
const FilterModal = ({
  category,
  subCategory,
}: {
  category?: string;
  subCategory?: string;
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="block md:hidden ">
        <div className="relative size-6 mb-2 flex cursor-pointer items-center justify-center rounded-full bg-[#F6F6FD] pt-1 sm:size-12">
          <Filter className="text-primary" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="rounded-r-2xl border-r-1 overflow-x-auto">
        <FilterSidebar
          onFilter={()=>setOpen(false)}
          filters={filterOptions}
          category={category}
          subCategory={subCategory}
        />
      </SheetContent>
    </Sheet>
  );
};
export default FilterModal;
