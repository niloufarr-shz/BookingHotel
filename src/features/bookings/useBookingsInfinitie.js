import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

const PAGE_SIZE = 10;

export function useBookingsInfinite() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  //query && //infinite scroll // مسئول گرفتن داده صفحه به صفحه 
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      getBookings({ filter, sortBy, page: pageParam }),

    getNextPageParam: (lastPage, allPages) => {
      const pageCount = Math.ceil(
        lastPage.count / PAGE_SIZE
      );

      return allPages.length < pageCount
        ? allPages.length + 1
        : undefined;
    },
  });

  const bookings = data?.pages.flatMap(
    page => page.data
  );

  return {
    bookings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
}
