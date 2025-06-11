"use client";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import FilterSidebar from "./Sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FiltersLayout = ({
  category,
  subCategory,
  filters,
  keyword = "",
}: {
  category?: string;
  subCategory?: string;
  keyword?: string;
  filters: MenuCategory[];
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(keyword);

  return (
    <>
      <div className="hidden md:block">
        <FilterSidebar
          filters={filters}
          categoryName={category}
          subCategoryName={subCategory}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </div>
      <div className="flex items-center justify-center gap-4 md:hidden">
        <Input
          id="search-filter-mobile"
          placeholder="Search..."
          className="max-w-64 rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="!size-10 cursor-pointer">
              <Filter className="text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="overflow-x-auto rounded-r-2xl border-r-1"
          >
            <FilterSidebar
              onFilter={() => setOpen(false)}
              filters={filters}
              categoryName={category}
              subCategoryName={subCategory}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default FiltersLayout;
