import styled from "styled-components";
import { parseISO, format, isToday, isValid } from "date-fns";
import Menus from "../../ui/Menus"
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { IoEyeOutline } from "react-icons/io5";
import { BsCalendar2Check } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    start_date,
    end_date,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate()
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // ✅ Safe date parsing (string → Date)
  const safeParseDate = (dateStr) => {
    if (!dateStr) return null;
    const date = parseISO(dateStr);
    return isValid(date) ? date : null;
  };

  const start = safeParseDate(start_date);
  const end = safeParseDate(end_date);

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {start
            ? isToday(start)
              ? "Today"
              : formatDistanceFromNow(start)
            : "—"}
          &rarr; {numNights} night stay
        </span>

        <span>
          {start ? format(start, "MMM dd yyyy") : "—"} &mdash;
          {end ? format(end, "MMM dd yyyy") : "—"}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId}/>

        <Menus.List id={bookingId}>
          <Menus.Button icon={<IoEyeOutline />} 
          onClick={()=> navigate(`/bookings/${bookingId}`)} >
           see details
           </Menus.Button>


         { status==="unconfirmed" &&
          <Menus.Button icon={<BsCalendar2Check />} 
          onClick={()=> navigate(`/checkin/${bookingId}`)} >
           check in
           </Menus.Button>}

        </Menus.List>  
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
