"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (!totalPages || totalPages <= 1) return null

  const getPageNumbers = (compact: boolean) => {
    const pages: (number | "...")[] = []
    const range = compact ? 1 : 2

    if (currentPage > range + 2) pages.push(1)
    if (currentPage > range + 3) pages.push("...")

    for (let i = currentPage - range; i <= currentPage + range; i++) {
      if (i > 0 && i <= totalPages) pages.push(i)
    }

    if (currentPage < totalPages - (range + 2)) pages.push("...")
    if (currentPage < totalPages - (range + 1)) pages.push(totalPages)

    return pages
  }

  const desktopPages = getPageNumbers(false)
  const mobilePages = getPageNumbers(true)

  return (
    <Pagination className="w-full">
      <PaginationContent className="justify-end w-full">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        <span className="flex sm:hidden">
          {mobilePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <span className="px-1.5 py-2 text-gray-500">...</span>
              ) : (
                <PaginationLink
                  size="sm"
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </span>

        <span className="hidden sm:flex">
          {desktopPages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </span>

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
