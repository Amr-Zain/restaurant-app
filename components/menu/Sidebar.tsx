"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    mainCategories: string[];
    subCategories: { [key: string]: string[] };
  };
  category?: string;
  subCategory?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters,category,subCategory }) => {
  const [selectedMainCategory, setSelectedMainCategory] = React.useState<string | undefined>(category);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<string | undefined>(subCategory);

  const toggleButton = (
    type: 'mainCategory' | 'subCategory',
    value: string
  ) => {
    if (type === 'mainCategory') {
      if (selectedMainCategory === value) {
        setSelectedMainCategory(undefined);
        setSelectedSubCategory(undefined);
      } else {
        setSelectedMainCategory(value);
        setSelectedSubCategory(undefined);
      }
    } else if (type === 'subCategory') {
      if (selectedMainCategory) {
        setSelectedSubCategory(selectedSubCategory === value ? undefined : value);
      }
    }
  };

  const removeSelectedFilter = (type: 'mainCategory' | 'subCategory') => {
    if (type === 'subCategory') {
      setSelectedSubCategory(undefined);
      return;
    }
    setSelectedMainCategory(undefined);
  };

  const clearAllFilters = () => {
    setSelectedMainCategory(undefined);
    setSelectedSubCategory(undefined);
  };

  const hasSelectedFilters = selectedMainCategory !== undefined || selectedSubCategory !== undefined;

  const currentSubCategories = selectedMainCategory ? filters.subCategories[selectedMainCategory] || [] : [];

  return (
    <div className="w-full md:w-64 p-6 bg-white flex-shrink-0 rounded-2xl self-start">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Selected filters</h2>
        {hasSelectedFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-red-600 font-medium p-0 h-auto"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="search-filter" className="block text-sm font-medium text-text-primary/40 mb-2">Search</label>
          <Input id="search-filter" placeholder="Search..." className="rounded-xl border-gray-300 focus:border-blue-400 focus:ring-blue-400" />
        </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {selectedMainCategory && (
          <span key={`main-${selectedMainCategory}`} className="text-xs text-primary bg-primary/10 px-3 py-2 rounded-sm flex items-center gap-1">
            {selectedMainCategory}
            <button
              onClick={() => removeSelectedFilter('mainCategory')}
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </span>
        )}
        {selectedSubCategory && (
          <span key={`sub-${selectedSubCategory}`} className="text-xs text-primary bg-primary/10 px-3 py-2 rounded-sm flex items-center gap-1">
            {selectedSubCategory}
            <button
              onClick={() => removeSelectedFilter('subCategory')}
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </span>
        )}
        {!hasSelectedFilters && (
          <p className="text-sm text-text">No filters selected.</p>
        )}
      </div>

        <div>
          <h3 className="text-sm font-medium text-primary/40 mb-2">Select main Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {filters.mainCategories.map(category => (
              <Button
                key={category}
                variant={selectedMainCategory === category ? "default" : "outline"}
                className={`rounded-xl !h-10 ${selectedMainCategory === category ? 'bg-primary text-white' : ' text-primary/40 hover:bg-gray-200 border-gray-300'}`}
                onClick={() => toggleButton('mainCategory', category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {selectedMainCategory && currentSubCategories.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-primary/40 bg-text-primary/10 mb-2">{selectedMainCategory}Select sub category </h3>
            <div className="grid grid-cols-2 gap-2">
              {currentSubCategories.map(subCategory => (
                <Button
                  key={subCategory}
                  variant={selectedSubCategory === subCategory ? "default" : "outline"}
                  className={`rounded-xl !h-10 ${selectedSubCategory === subCategory ? 'bg-primary text-white' : ' text-primary/40 hover:bg-gray-200 border-gray-300'}`}
                  onClick={() => toggleButton('subCategory', subCategory)}
                >
                  {subCategory}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Button className="!h-12 w-full  font-semibold">
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;