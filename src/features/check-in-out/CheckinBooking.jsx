import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import styled from "styled-components";
import { box } from "../../styles/styles";

import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useChekin";
const Box = styled.div`
  ${box}
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  const moveBack = useMoveBack();
 const { checkin, isCheckinIn } = useCheckin ()
  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  function handleCheckin() {
    if(!confirmedPaid) return;
    checkin(bookingId)
  }
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <div>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmedPaid || isCheckinIn}
        >
          i confirm that {guests.fullName} has paid the total amount of{formatCurrency(totalPrice)}
        </Checkbox>
      </div>

      {/* {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={onToggleBreakfast}
            id="breakfast"
          >
            Want to add breakfast for {breakfastPriceText}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={onToggleConfirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {totalPriceText}
        </Checkbox>
      </Box> */}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid || isCheckinIn} >Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
