"use client";

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 0 && page <= totalPages) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const getPageButtonClassName = (page: number) => `
    rounded-full px-4 py-2 text-sm font-medium border
    ${
      currentPage == page
        ? "bg-primary text-white hover:bg-primary/30"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }
  `;
  return (
    <div className="mt-8 flex items-center justify-end space-x-2">
      <Pagination>
        <PaginationContent>
           <PaginationItem
            onClick={() => onPageChange(+currentPage - 1)}
            className={
              getPageButtonClassName(totalPages)+" !py-3 !px-3"
            }
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </PaginationItem>

          <PaginationItem
            onClick={() => onPageChange(1)}
            className={getPageButtonClassName(1)}
          >
            1
          </PaginationItem>

          {totalPages >= 2 && (
            <PaginationItem
              onClick={() => onPageChange(2)}
              className={getPageButtonClassName(2)}
            >
              2
            </PaginationItem>
          )}

          {totalPages > 2 && currentPage < totalPages && currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {totalPages > 2 && currentPage > 2 && currentPage < totalPages && (
            <PaginationItem
              onClick={() => onPageChange(currentPage)}
              className={getPageButtonClassName(currentPage)}
            >
              {currentPage}
            </PaginationItem>
          )}

          {totalPages > 2 && currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {totalPages > 2 && (
            <PaginationItem
              onClick={() => onPageChange(totalPages)}
              className={getPageButtonClassName(totalPages)}
            >
              {totalPages}
            </PaginationItem>
          )}

          {/* Next Button */}
          {/* <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(+currentPage + 1)}
              className={
                "rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
              }
              href={
                currentPage === totalPages
                  ? "#"
                  : `${pathname}?${new URLSearchParams(searchParams).set("page", (currentPage + 1).toString().toString())}`
              }
            />
          </PaginationItem> */}
          <PaginationItem
            onClick={() => onPageChange(+currentPage + 1)}
            className={
              getPageButtonClassName(totalPages)+" !py-3 !px-3"
            }
          >
            <ChevronRightIcon className="w-4 h-4" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
