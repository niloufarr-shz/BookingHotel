import styled from "styled-components";
import { parseISO, format, isToday, isValid } from "date-fns";
import { IoEyeOutline } from "react-icons/io5";
import { BsCalendar2Check } from "react-icons/bs";
import { CiInboxOut } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
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
  const navigate = useNavigate();
  const { checkout, isCheckOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
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

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<IoEyeOutline />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              see details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<BsCalendar2Check />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<CiInboxOut />}
                disabled={isCheckOut}
                onClick={() => checkout(bookingId)}
              >
                check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<MdDelete />}>Delete Booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
