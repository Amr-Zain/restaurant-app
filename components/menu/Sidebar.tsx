"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface FilterSidebarProps {
  filters: MenuCategory[];
  initialCategoryIds?: string[];
  initialSubCategoryIds?: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onFilter?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  initialCategoryIds = [],
  initialSubCategoryIds = [],
  searchQuery,
  setSearchQuery,
  onFilter,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('searchFilters'); 

  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<string[]>(initialCategoryIds);
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = React.useState<string[]>(initialSubCategoryIds);

  const availableSubcategories = React.useMemo(() => {
    const subs: MenuSubcategory[] = [];
    filters.forEach(cat => {
      if (selectedCategoryIds.includes(cat.id.toString())) {
        subs.push(...cat.subcategories);
      }
    });
    return subs;
  }, [filters, selectedCategoryIds]);

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategoryIds.length > 0) {
      params.set("categories", selectedCategoryIds.join(","));
    } else {
      params.delete("categories");
    }
    if (selectedSubCategoryIds.length > 0) {
      params.set("sub_categories", selectedSubCategoryIds.join(","));
    } else {
      params.delete("sub_categories");
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

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId.toString())) { // Convert to string for consistency
        // If deselected, also deselect all its subcategories to maintain consistency
        const category = filters.find(cat => cat.id === categoryId);
        if (category) {
          const subCategoryIdsToRemove = category.subcategories.map(sub => sub.id.toString()); // Convert to string
          setSelectedSubCategoryIds(currentSubIds =>
            currentSubIds.filter(id => !subCategoryIdsToRemove.includes(id))
          );
        }
        return prev.filter((id) => id !== categoryId.toString()); // Convert to string
      } else {
        return [...prev, categoryId.toString()]; // Convert to string
      }
    });
  };

  // Function to toggle selection of a subcategory
  const toggleSubCategory = (subCategoryId: number) => {
    setSelectedSubCategoryIds((prev) => {
      if (prev.includes(subCategoryId.toString())) {
        return prev.filter((id) => id !== subCategoryId.toString());
      } else {
        return [...prev, subCategoryId.toString()];
      }
    });
  };

  const removeSelectedFilter = (type: "category" | "subCategory", idToRemove?: number) => {
    if (type === "subCategory" && idToRemove !== undefined) {
      setSelectedSubCategoryIds((prev) => prev.filter((id) => id !== idToRemove.toString()));
    } else if (type === "category" && idToRemove !== undefined) {
      setSelectedCategoryIds((prev) => {
        // When a main category is removed, also remove its associated subcategories
        const category = filters.find(cat => cat.id === idToRemove);
        if (category) {
          const subCategoryIdsToRemove = category.subcategories.map(sub => sub.id.toString());
          setSelectedSubCategoryIds(currentSubIds =>
            currentSubIds.filter(id => !subCategoryIdsToRemove.includes(id))
          );
        }
        return prev.filter((id) => id !== idToRemove.toString());
      });
    }
  };


  const clearAllFilters = () => {
    setSelectedCategoryIds([]);
    setSelectedSubCategoryIds([]);
    setSearchQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("categories");
    params.delete("sub_categories");
    params.delete("keyword");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    if (onFilter) onFilter();
  };

  const hasSelectedFilters =
    selectedCategoryIds.length > 0 ||
    selectedSubCategoryIds.length > 0 ||
    searchQuery.trim() !== "";

  return (
    <div className="w-full flex-shrink-0 self-start rounded-2xl bg-white p-4 md:w-58">
      <div className="mb-4 flex items-center justify-between mt-4">
        <h2 className="text-lg font-semibold text-gray-800 ">
          {t("selectedFilters")}
        </h2>
        {hasSelectedFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-sm font-medium text-red-600 cursor-pointer hover:text-red-800 hover:bg-transparent"
            onClick={clearAllFilters}
          >
            {t("clearAll")}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="hidden md:block">
          <label
            htmlFor="search-filter"
            className="text-text-primary/40 mb-2 block text-sm font-medium"
          >
            {t("search")}
          </label>
          <Input
            id="search-filter"
            placeholder={t("searchPlaceholder")}
            className="rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedCategoryIds.map((categoryId) => {
            const category = filters.find((cat) => cat.id.toString() === categoryId);
            return (
              category && (
                <span
                  key={`main-${category.id}`}
                  className="text-primary bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-2 text-xs"
                >
                  {category.name}
                  <button
                    onClick={() => {
                      removeSelectedFilter("category", category.id);
                    }}
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </span>
              )
            );
          })}
          {selectedSubCategoryIds.map((subCategoryId) => {
            let subCategoryName = '';
            for (const cat of filters) {
              const sub = cat.subcategories.find(s => s.id.toString() === subCategoryId);
              if (sub) {
                subCategoryName = sub.name;
                break;
              }
            }
            return (
              subCategoryName && (
                <span
                  key={`sub-${subCategoryId}`}
                  className="text-primary bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-2 text-xs"
                >
                  {subCategoryName}
                  <button
                    onClick={() => {
                      removeSelectedFilter("subCategory", +subCategoryId);
                    }}
                    className="cursor-pointer" 
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </span>
              )
            );
          })}
          {!hasSelectedFilters && (
            <p className="text-text text-sm">{t("noFiltersSelected")}</p>
          )}
        </div>

        <div>
          <h3 className="text-primary/40 mb-2 text-sm font-medium">
            {t("selectMainCategories")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {filters.map((categoryItem) => (
              <Button
                key={categoryItem.id}
                variant={selectedCategoryIds.includes(categoryItem.id.toString()) ? "default" : "outline"}
                className={`!h-10 rounded-xl cursor-pointer ${selectedCategoryIds.includes(categoryItem.id.toString()) ? "bg-primary text-white" : "text-primary/40 border-gray-300 hover:bg-gray-200"}`}
                onClick={() => toggleCategory(categoryItem.id)}
              >
                {categoryItem.name}
              </Button>
            ))}
          </div>
        </div>

        {selectedCategoryIds.length > 0 && availableSubcategories.length > 0 && (
          <div>
            <h3 className="text-primary/40 bg-text-primary/10 mb-2 text-sm font-medium">
              {t("selectSubcategories")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableSubcategories.map((subCatItem) => (
                <Button
                  key={subCatItem.id}
                  variant={selectedSubCategoryIds.includes(subCatItem.id.toString()) ? "default" : "outline"}
                  className={`!h-10 rounded-xl cursor-pointer ${selectedSubCategoryIds.includes(subCatItem.id.toString()) ? "bg-primary text-white" : "text-primary/40 border-gray-300 hover:bg-gray-200"}`}
                  onClick={() => toggleSubCategory(subCatItem.id)}
                >
                  {subCatItem.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Button className="!h-12 w-full font-semibold cursor-pointer" onClick={applyFilter}>
          {t("applyFilter")}
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;