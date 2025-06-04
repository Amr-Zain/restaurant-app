"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter and useSearchParams

interface FilterSidebarProps {
  filters: {
    mainCategories: string[];
    subCategories: { [key: string]: string[] };
  };
  category?: string;
  subCategory?: string;
  onFilter?:()=>void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  category,
  subCategory,
  onFilter
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMainCategory, setSelectedMainCategory] = React.useState<
    string | undefined
  >(category);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    string | undefined
  >(subCategory);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedMainCategory) {
      params.set("category", selectedMainCategory);
    } else {
      params.delete("category");
    }
    if (selectedSubCategory) {
      params.set("subCategory", selectedSubCategory);
    } else {
      params.delete("subCategory");
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    if(onFilter)onFilter();
  };

  const toggleButton = (
    type: "mainCategory" | "subCategory",
    value: string,
  ) => {
    if (type === "mainCategory") {
      if (selectedMainCategory === value) {
        setSelectedMainCategory(undefined);
        setSelectedSubCategory(undefined);
      } else {
        setSelectedMainCategory(value);
        setSelectedSubCategory(undefined);
      }
    } else if (type === "subCategory") {
      if (selectedMainCategory) {
        setSelectedSubCategory(
          selectedSubCategory === value ? undefined : value,
        );
      }
    }
  };

  const removeSelectedFilter = (type: "mainCategory" | "subCategory") => {
    if (type === "subCategory") {
      setSelectedSubCategory(undefined);
      return;
    }
    setSelectedMainCategory(undefined);
  };

  const clearAllFilters = () => {
    setSelectedMainCategory(undefined);
    setSelectedSubCategory(undefined);
    setSearchQuery("");
  };

  const hasSelectedFilters =
    selectedMainCategory !== undefined ||
    selectedSubCategory !== undefined ||
    searchQuery.trim() !== "";

  const currentSubCategories = selectedMainCategory
    ? filters.subCategories[selectedMainCategory] || []
    : [];

  return (
    <div className="w-full flex-shrink-0 self-start rounded-2xl bg-white p-4 md:w-58">
      <div className="mb-4 flex items-center justify-between mt-4">
        <h2 className="text-lg font-semibold text-gray-800 ">
          Selected filters
        </h2>
        {hasSelectedFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-sm font-medium text-red-600"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="search-filter"
            className="text-text-primary/40 mb-2 block text-sm font-medium"
          >
            Search
          </label>
          <Input
            id="search-filter"
            placeholder="Search..."
            className="rounded-xl border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {selectedMainCategory && (
            <span
              key={`main-${selectedMainCategory}`}
              className="text-primary bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-2 text-xs"
            >
              {selectedMainCategory}
              <button
                onClick={() => {
                  removeSelectedFilter("mainCategory");
                  applyFilter();
                }} // Apply filter immediately
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          )}
          {selectedSubCategory && (
            <span
              key={`sub-${selectedSubCategory}`}
              className="text-primary bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-2 text-xs"
            >
              {selectedSubCategory}
              <button
                onClick={() => {
                  removeSelectedFilter("subCategory");
                  applyFilter();
                }}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          )}
          {!hasSelectedFilters && (
            <p className="text-text text-sm">No filters selected.</p>
          )}
        </div>

        <div>
          <h3 className="text-primary/40 mb-2 text-sm font-medium">
            Select main Categories
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {filters.mainCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedMainCategory === cat ? "default" : "outline"}
                className={`!h-10 rounded-xl ${selectedMainCategory === cat ? "bg-primary text-white" : "text-primary/40 border-gray-300 hover:bg-gray-200"}`}
                onClick={() => toggleButton("mainCategory", cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {selectedMainCategory && currentSubCategories.length > 0 && (
          <div>
            <h3 className="text-primary/40 bg-text-primary/10 mb-2 text-sm font-medium">
              {selectedMainCategory} Select sub category{" "}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {currentSubCategories.map((subCat) => (
                <Button
                  key={subCat}
                  variant={
                    selectedSubCategory === subCat ? "default" : "outline"
                  }
                  className={`!h-10 rounded-xl ${selectedSubCategory === subCat ? "bg-primary text-white" : "text-primary/40 border-gray-300 hover:bg-gray-200"}`}
                  onClick={() => toggleButton("subCategory", subCat)}
                >
                  {subCat}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Button className="!h-12 w-full font-semibold" onClick={applyFilter}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
