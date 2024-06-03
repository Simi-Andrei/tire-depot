import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = ({ page, prevPage, nextPage, totalPages }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={page == 1 ? "pointer-events-none opacity-50" : ""}
            href={`?page=${prevPage}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="font-semibold" href="#">
            {page}/{totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
            href={`?page=${nextPage}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
