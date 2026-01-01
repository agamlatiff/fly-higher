# FlyHigher Flight Booking System - Specifications

> **The Blueprint** — Single source of truth untuk apa yang harus dibikin.

---

## Overview

Sistem pemesanan tiket penerbangan berbasis web **FlyHigher** menggunakan Next.js 14 dan PostgreSQL.

### Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| **Frontend** | Next.js 14, React, TypeScript  |
| **Styling**  | Tailwind CSS                   |
| **Database** | PostgreSQL (via Prisma ORM)    |
| **Auth**     | Lucia Auth v3 (session-based)  |
| **Payment**  | Midtrans                       |
| **State**    | TanStack Query + React Context |

---

## Pages

### User Pages

| Route                     | Page               | Description                       |
| ------------------------- | ------------------ | --------------------------------- |
| `/`                       | Home               | Landing page dengan search flight |
| `/available-flights`      | Available Flights  | Daftar penerbangan tersedia       |
| `/choose-seat/[id]`       | Choose Seat        | Pilih kursi penerbangan           |
| `/checkout`               | Checkout           | Halaman pembayaran                |
| `/success-checkout`       | Success            | Konfirmasi booking berhasil       |
| `/my-tickets`             | My Tickets         | Daftar tiket user                 |
| `/my-tickets/detail/[id]` | Ticket Detail      | Detail tiket                      |
| `/destinations`           | Destinations       | Daftar destinasi                  |
| `/destinations/[slug]`    | Destination Detail | Detail destinasi                  |
| `/partners`               | Partners           | Partner airlines                  |
| `/support`                | Support            | FAQ dan bantuan                   |
| `/about`                  | About              | Tentang aplikasi                  |

### Auth Pages

| Route      | Page    | Description        |
| ---------- | ------- | ------------------ |
| `/sign-in` | Sign In | Halaman login      |
| `/sign-up` | Sign Up | Halaman registrasi |

### Admin Dashboard Pages

| Route                  | Page           | Description              |
| ---------------------- | -------------- | ------------------------ |
| `/dashboard`           | Dashboard Home | Overview statistik admin |
| `/dashboard/airplanes` | Airplanes      | Kelola data pesawat      |
| `/dashboard/flights`   | Flights        | Kelola data penerbangan  |
| `/dashboard/tickets`   | Tickets        | Kelola data tiket        |
| `/dashboard/users`     | Users          | Kelola data pengguna     |

---

## Authentication

### Auth Flow

**Sign Up:**

1. User mengisi form (name, email, password)
2. Validasi input → Hash password
3. Simpan user ke database (role: CUSTOMER)
4. Buat session → Redirect ke home

**Sign In:**

1. User mengisi email & password
2. Verifikasi password
3. Buat session baru → Set cookie
4. Redirect ke home/dashboard

**Sign Out:**

1. Hapus session dari database
2. Hapus cookie → Redirect ke sign-in

### Session Cookie

- Name: `session`
- HttpOnly: true, Secure: true (production), SameSite: Lax

### Role-Based Access

| Role       | Access                       |
| ---------- | ---------------------------- |
| `CUSTOMER` | User pages, My Tickets       |
| `ADMIN`    | Dashboard, semua fitur admin |

### Protected Routes

- **Customer:** `/checkout/*`, `/my-tickets/*`, `/choose-seat/*`
- **Admin:** `/dashboard/*`

---

## API Endpoints

### GET `/api/flights`

Mengambil daftar penerbangan berdasarkan filter.

**Query Parameters:**

| Param        | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| `from`       | string | Kode kota asal                      |
| `to`         | string | Kode kota tujuan                    |
| `date`       | string | Tanggal keberangkatan               |
| `passengers` | number | Jumlah penumpang                    |
| `seatType`   | string | Tipe kursi (ECONOMY/BUSINESS/FIRST) |

**Response:**

```json
{
  "flights": [
    {
      "id": "string",
      "departureCity": "string",
      "departureCityCode": "string",
      "destinationCity": "string",
      "destinationCityCode": "string",
      "departureDate": "datetime",
      "arrivalDate": "datetime",
      "price": "number",
      "plane": { "name": "string", "code": "string", "image": "string" },
      "availableSeats": "number"
    }
  ]
}
```

### POST `/api/transactions`

Membuat transaksi dan mendapatkan token Midtrans.

**Request:** `{ "flightId": "string", "seatId": "string", "customerId": "string" }`

**Response:** `{ "ticket": { "id": "string", "code": "string", "status": "PENDING" }, "token": "string" }`

### PUT `/api/transactions/[id]`

Update status transaksi dari Midtrans callback.

**Request:** `{ "status": "SUCCESS" | "FAILED" }`

### Server Actions

| Action          | Location                                  | Description        |
| --------------- | ----------------------------------------- | ------------------ |
| `signIn`        | `/src/app/(auth)/sign-in/lib/actions.ts`  | Login user         |
| `signUp`        | `/src/app/(auth)/sign-up/lib/actions.ts`  | Register user      |
| `createBooking` | `/src/app/(home)/checkout/lib/actions.ts` | Buat booking baru  |
| `getFlights`    | `/src/app/(home)/lib/actions.ts`          | Ambil data flights |

---

## UI Components

### Shared Components (`/src/components/ui/`)

| Component      | Description                    |
| -------------- | ------------------------------ |
| `Accordion`    | Expandable content sections    |
| `Badge`        | Status badges/labels           |
| `Breadcrumb`   | Navigation breadcrumbs         |
| `Button`       | Tombol dengan berbagai variant |
| `Card`         | Card container component       |
| `DataTable`    | Tabel data dengan sorting      |
| `DropdownMenu` | Menu dropdown                  |
| `EmptyState`   | Empty state placeholder        |
| `Input`        | Form input field               |
| `Select`       | Dropdown select                |
| `Skeleton`     | Loading skeleton               |
| `Table`        | Basic table component          |
| `Tabs`         | Tab navigation                 |
| `Toast`        | Toast notifications            |

### Page-Specific Components

- **Home:** Hero section, Flight search form, Popular destinations
- **Available Flights:** Flight card, Flight list, Filter sidebar
- **Choose Seat:** Seat grid, Seat legend, Seat selection
- **Checkout:** Booking summary, Payment form, Price breakdown
- **My Tickets:** Ticket card, Ticket list, Ticket detail
- **Dashboard:** Stats cards, Recent bookings table, Charts, Quick actions

---

## Features

### User Features

| Feature           | Capabilities                                                 |
| ----------------- | ------------------------------------------------------------ |
| 🔍 Flight Search  | Cari berdasarkan kota, tanggal, tipe kursi, jumlah penumpang |
| 🪑 Seat Selection | Layout kursi, pilih kursi, status & harga per tipe           |
| 💳 Booking        | Checkout, integrasi Midtrans, konfirmasi via email           |
| 🎫 Ticket Mgmt    | Daftar tiket, detail tiket, status (Pending/Success/Failed)  |
| 👤 User Account   | Registrasi, login, simpan data passport                      |

### Admin Features

| Feature          | Capabilities                                    |
| ---------------- | ----------------------------------------------- |
| 📊 Dashboard     | Stats, revenue, active flights, recent bookings |
| ✈️ Airplane Mgmt | CRUD pesawat, upload gambar, kode pesawat       |
| 🛫 Flight Mgmt   | CRUD penerbangan, jadwal, harga, kelola kursi   |
| 🎟️ Ticket Mgmt   | Lihat semua tiket, ubah status, filter          |
| 👥 User Mgmt     | Daftar user, ubah role, hapus user              |

### Technical Features

- **Security:** Password hashing (bcrypt), session-based auth, protected routes, CSRF protection
- **Performance:** SSR, database indexing, image optimization, lazy loading
- **Responsive:** Mobile-first, responsive breakpoints, touch-friendly UI

---

## Admin Panel Details

### Dashboard Home (`/dashboard`)

**Stats Cards:** Total Revenue, Total Bookings, Active Flights, Total Users

**Recent Bookings Table:** Kode tiket, Nama customer, Rute, Tanggal, Status, Harga

### Airplanes (`/dashboard/airplanes`)

**Columns:** Code, Name, Image, Total Flights, Actions

**Form:** Code (required), Name (required), Image (file upload, required)

### Flights (`/dashboard/flights`)

**Columns:** Route, Airplane, Departure, Arrival, Price, Available Seats, Actions

**Form:** Airplane, Departure/Destination City & Code, Departure/Arrival Date, Price

### Tickets (`/dashboard/tickets`)

**Columns:** Code, Customer, Flight, Seat, Booking Date, Price, Status, Actions

**Filters:** All, Pending, Success, Failed

### Users (`/dashboard/users`)

**Columns:** Name, Email, Role, Total Bookings, Actions

**Role Management:** CUSTOMER ↔ ADMIN

---

## Admin Panel Functionality (Phase 6)

### URL-Based State Management

Admin pages menggunakan URL search params untuk state management agar:

- Shareable URLs
- Browser back/forward compatible
- Server-side rendering friendly

**Pattern:**

```
/dashboard/flights?q=jakarta&status=scheduled&date=2024-01-15&page=2&limit=10
```

**Params Schema:**
| Param | Type | Default | Description |
|----------|--------|---------|----------------------|
| `q` | string | - | Search query |
| `status` | string | "all" | Filter by status |
| `page` | number | 1 | Current page number |
| `limit` | number | 10 | Items per page |
| `sort` | string | - | Sort field |
| `order` | string | "desc" | Sort order (asc/desc) |

### Server Actions Pattern

```typescript
// lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateSchema = z.object({
  name: z.string().min(1),
  // ... other fields
});

export async function createItem(formData: FormData) {
  const validated = CreateSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.item.create({ data: validated.data });
    revalidatePath("/dashboard/items");
    redirect("/dashboard/items");
  } catch (error) {
    return { error: { _form: ["Failed to create item"] } };
  }
}
```

### Data Fetching with Filters

```typescript
// lib/data.ts
interface GetItemsParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getItems(params: GetItemsParams) {
  const { search, status, page = 1, limit = 10 } = params;

  const where: Prisma.ItemWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status && status !== "all") {
    where.status = status;
  }

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.item.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
```

### Admin API Endpoints (Server Actions)

| Entity   | Action        | Function                         |
| -------- | ------------- | -------------------------------- |
| Airplane | Create        | `createAirplane(formData)`       |
| Airplane | Update        | `updateAirplane(id, formData)`   |
| Airplane | Delete        | `deleteAirplane(id)`             |
| Flight   | Create        | `createFlight(formData)`         |
| Flight   | Update        | `updateFlight(id, formData)`     |
| Flight   | Delete        | `deleteFlight(id)`               |
| Ticket   | Update Status | `updateTicketStatus(id, status)` |
| Ticket   | Delete        | `deleteTicket(id)`               |
| User     | Update        | `updateUser(id, data)`           |
| User     | Update Role   | `updateUserRole(id, role)`       |
| User     | Delete        | `deleteUser(id)`                 |

### Form Validation Schemas

```typescript
// Airplane
export const AirplaneSchema = z.object({
  code: z.string().min(3).max(10),
  name: z.string().min(1).max(100),
  image: z.instanceof(File).optional(),
});

// Flight
export const FlightSchema = z.object({
  planeId: z.string().cuid(),
  departureCity: z.string().min(1),
  departureCityCode: z.string().length(3),
  destinationCity: z.string().min(1),
  destinationCityCode: z.string().length(3),
  departureDate: z.date(),
  arrivalDate: z.date(),
  price: z.number().positive(),
});

// Ticket Status Update
export const TicketStatusSchema = z.object({
  status: z.enum(["PENDING", "SUCCESS", "FAILED"]),
});

// User Update
export const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});
```

### Reusable Admin Components

| Component           | Location                              | Purpose                         |
| ------------------- | ------------------------------------- | ------------------------------- |
| `AdminSearchInput`  | `/components/admin/AdminSearchInput`  | Debounced search with URL sync  |
| `AdminFilterSelect` | `/components/admin/AdminFilterSelect` | Filter dropdown with URL sync   |
| `AdminPagination`   | `/components/admin/AdminPagination`   | Pagination controls             |
| `ConfirmModal`      | `/components/ui/confirm-modal`        | Delete/destructive actions      |
| `ActionButtons`     | `/components/admin/ActionButtons`     | View, Edit, Delete button group |

---

## Component Conventions

### Naming

| Type       | Convention                     | Example                       |
| ---------- | ------------------------------ | ----------------------------- |
| Components | PascalCase                     | `FlightSearchWidget.tsx`      |
| Pages      | lowercase folder + `page.tsx`  | `choose-seat/[id]/page.tsx`   |
| Hooks      | camelCase with `use` prefix    | `useCheckoutData.tsx`         |
| Utils      | camelCase                      | `formatPrice()`               |
| API Routes | lowercase + `route.ts`         | `api/flights/route.ts`        |
| Types      | PascalCase + Type/Props suffix | `FlightType`, `SeatItemProps` |

### Component Structure

```tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={cn("base-styles", variant === "primary" && "primary-styles")}
    >
      {children}
    </button>
  );
}
```
