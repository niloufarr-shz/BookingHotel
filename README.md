# 🏨 BookingHotel – Hotel Management Dashboard

BookingHotel is a **hotel management dashboard** designed for hotel employees to manage cabins, bookings, guests, and daily operations efficiently.  
This application is built as an internal tool and focuses on usability, performance, and clear data visualization.

---

## ✨ Features

### 🔐 Authentication & Users
- Only **hotel employees** can use the app
- Users must **log in** to access the system
- New users can only be **created inside the application**
- Users can:
  - Update their **name**
  - Change their **password**
  - Upload an **avatar**

---

### 🛏️ Cabins Management
- View all cabins in a **table view**
- Cabin information includes:
  - Photo
  - Name
  - Capacity
  - Price
  - Current discount
- Create new cabins (with photo upload)
- Update or delete existing cabins

---

### 📅 Bookings Management
- View all bookings in a table with:
  - Arrival & departure dates
  - Booking status
  - Paid amount
  - Cabin and guest details
- Booking statuses:
  - `unconfirmed` (booked but not checked in)
  - `checked in`
  - `checked out`
- Filter bookings by status
- Booking actions:
  - Delete booking
  - Check in guest
  - Check out guest

---

### 💳 Check-in & Payments
- Payments may be handled **outside the app**
- On check-in:
  - Staff confirms payment inside the app
  - Guests can add **breakfast for the entire stay** if not already included

---

### 👤 Guest Information
Each guest record includes:
- Full name
- Email
- National ID
- Nationality
- Country flag for easy identification

---

### 📊 Dashboard & Analytics
The dashboard is the **main screen** of the app and shows data for the last **7, 30, or 90 days**:

- Guests checking in and out **today**
- Statistics on:
  - Recent bookings
  - Sales
  - Check-ins
  - Occupancy rate
- Charts:
  - Daily hotel sales (total sales vs extras like breakfast)
  - Stay duration statistics

---

### ⚙️ Application Settings
Admins can configure global settings:
- Breakfast price
- Minimum and maximum nights per booking
- Maximum guests per booking

---

### 🌙 UI & UX
- Fully responsive layout
- **Dark mode** support
- Clean and modern UI

---

## 🧰 Tech Stack

- **React vite**
- **React Router**
- **React-query**
- **Context API**
- **React Hook Form**
- **Supabase** (authentication, database, storage)
- **Styled Components**
- React icons / React hot toast / Recharts / data-fns 

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/niloufarr-shz/BookingHotel.git
