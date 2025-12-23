import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// حذف داده‌های جدول‌ها
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

// ایجاد داده‌ها در جدول‌ها
async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // دریافت guestId و cabinId واقعی از دیتابیس
  const { data: guestsIds, error: guestsError } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  if (guestsError) console.log(guestsError.message);
  const allGuestIds = guestsIds.map((g) => g.id);

  const { data: cabinsIds, error: cabinsError } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  if (cabinsError) console.log(cabinsError.message);
  const allCabinIds = cabinsIds.map((c) => c.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.end_date, booking.start_date);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extraPrice;

    // تعیین وضعیت رزرو
    let status;
    const startDateObj = new Date(booking.start_date);
    const endDateObj = new Date(booking.end_date);

    if (isPast(endDateObj) && !isToday(endDateObj)) status = "checked-out";
    else if (isFuture(startDateObj) || isToday(startDateObj))
      status = "unconfirmed";
    else if (
      (isFuture(endDateObj) || isToday(endDateObj)) &&
      isPast(startDateObj) &&
      !isToday(startDateObj)
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
      start_date: booking.start_date, // نام ستون مطابق جدول
      end_date: booking.end_date, // نام ستون مطابق جدول
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

export default function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // حذف داده‌ها به ترتیب صحیح
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // ایجاد داده‌ها
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <h3>DEV AREA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL sample data
      </Button>
      <p>Only run this only once!</p>
      <p>
        <em>(Cabin images need to be uploaded manually)</em>
      </p>
      <hr />
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload CURRENT bookings
      </Button>
      <p>You can run this every day you develop the app</p>
    </div>
  );
}
