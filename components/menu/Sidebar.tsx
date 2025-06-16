"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterSidebarProps {
  filters: MenuCategory[];
  categoryName?: string;
  subCategoryName?: string;
  searchQuery: string;
  setSearchQuery: (value:string) => void;
  onFilter?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  categoryName='',
  subCategoryName='',
  searchQuery,
  setSearchQuery,
  onFilter,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMainCategoryName, setSelectedMainCategoryName] = React.useState<
    string 
  >(categoryName);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = React.useState<
    string 
  >(subCategoryName);

  const currentSelectedMainCategory = React.useMemo(() => {
    return filters.find(
      (cat) => cat.name === selectedMainCategoryName,
    );
  }, [filters, selectedMainCategoryName]);

  const currentSubCategories = React.useMemo(() => {
    return currentSelectedMainCategory?.subcategories || [];
  }, [currentSelectedMainCategory]);

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedMainCategoryName) {
      params.set("category", selectedMainCategoryName);
    } else {
      params.delete("category");
    }

    if (selectedSubCategoryName) {
      params.set("subCategory", selectedSubCategoryName);
    } else {
      params.delete("subCategory");
    }

    if (searchQuery.trim()) {
      params.set("keyword", searchQuery.trim());
    } else {
      params.delete("keyword");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
    if (onFilter) onFilter();
  };

  const toggleButton = (
    type: "mainCategory" | "subCategory",
    valueName: string, 
  ) => {
    if (type === "mainCategory") {
      if (selectedMainCategoryName === valueName) {
        setSelectedMainCategoryName('');
        setSelectedSubCategoryName(''); 
      } else {
        setSelectedMainCategoryName(valueName);
        setSelectedSubCategoryName('');
      }
    } else if (type === "subCategory") {
      if (selectedMainCategoryName) {
        setSelectedSubCategoryName(
          selectedSubCategoryName === valueName ? '' : valueName,
        );
      }
    }
  };

  const removeSelectedFilter = (type: "mainCategory" | "subCategory") => {
    if (type === "subCategory") {
      setSelectedSubCategoryName('');
    } else if (type === "mainCategory") {
      setSelectedMainCategoryName('');
      setSelectedSubCategoryName(''); 
    }
  };

  const clearAllFilters = () => {
    setSelectedMainCategoryName('');
    setSelectedSubCategoryName('');
    setSearchQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("subCategory");
    params.delete("keyword");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    if (onFilter) onFilter();
  };

  const hasSelectedFilters =
    selectedMainCategoryName !== '' ||
    selectedSubCategoryName !== '' ||
    searchQuery.trim() !== "";

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
        <div className="hidden md:block">
          <label
            htmlFor="search-filter"
            className="text-text-primary/40 mb-2 block text-sm font-medium"
          >
            Search
          </label>
          <Input
            id="search-filter"
            placeholder="Search..."
            className="rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {selectedMainCategoryName && (
            <span
              key={`main-${selectedMainCategoryName}`}
              className="text-primary bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-2 text-xs"
            >
              {selectedMainCategoryName}
              <button
                onClick={() => {
                  removeSelectedFilter("mainCategory");
                  applyFilter(); // Apply filter immediately
                }}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          )}
          {selectedSubCategoryName && (
            <span
              key={`sub-${selectedSubCategoryName}`}
              className="text-primary bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-2 text-xs"
            >
              {selectedSubCategoryName}
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
            {filters.map((categoryItem) => (
              <Button
                key={categoryItem.id}
                variant={
                  selectedMainCategoryName === categoryItem.name
                    ? "default"
                    : "outline"
                }
                className={`!h-10 rounded-xl ${selectedMainCategoryName === categoryItem.name ? "bg-primary text-white" : "text-primary/40 border-gray-300 hover:bg-gray-200"}`}
                onClick={() => toggleButton("mainCategory", categoryItem.name)}
              >
                {categoryItem.name}
              </Button>
            ))}
          </div>
        </div>

        {selectedMainCategoryName && currentSubCategories.length > 0 && (
          <div>
            <h3 className="text-primary/40 bg-text-primary/10 mb-2 text-sm font-medium">
              {selectedMainCategoryName} Select sub category{" "}
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentSubCategories.map((subCatItem) => (
                <Button
                  key={subCatItem.id} 
                  variant={
                    selectedSubCategoryName === subCatItem.name
                      ? "default"
                      : "outline"
                  }
                  className={`!h-10 rounded-xl ${selectedSubCategoryName === subCatItem.name ? "bg-primary text-white" : "text-primary/40 border-gray-300 hover:bg-gray-200"}`}
                  onClick={() => toggleButton("subCategory", subCatItem.name)}
                >
                  {subCatItem.name}
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