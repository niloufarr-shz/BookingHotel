import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue , method: "eq" };
  //{field: "totalPrice", value: 5000 , method:"gte"}

  //sorting
  /* const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [ field, direction ] = sortByRaw.split("-");
  const sortBy = { field, direction }; */
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });
  return { isLoading, bookings, error };
}
