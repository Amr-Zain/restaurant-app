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
  const { push } = useRouter();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 0 && page <= totalPages) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    push(`${pathname}?${params.toString()}`);
  };

  const getPageButtonClassName = (page: number) => `
    rounded-full  text-sm font-medium border cursor-pointer size-10 flex justify-center items-center
    ${
      currentPage == page
        ? "bg-primary text-white hover:bg-primary/30"
        : "hover:bg-primary/10 border-primary text-primary"
    }
  `;
  return (
    <div className="my-8 flex items-center justify-end space-x-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() => onPageChange(+currentPage - 1)}
            className={getPageButtonClassName(totalPages)}
          >
            <ChevronLeftIcon className="size-4" />
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
            <PaginationItem className={getPageButtonClassName(totalPages)}>
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
            <PaginationItem className={getPageButtonClassName(totalPages)}>
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

          <PaginationItem
            onClick={() => onPageChange(+currentPage + 1)}
            className={getPageButtonClassName(totalPages)}
          >
            <ChevronRightIcon className="size-4" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
