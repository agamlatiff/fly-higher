# FlyHigher Flight Booking System ✈️

FlyHigher is a modern, full-stack flight booking application built with **Next.js 14**, **PostgreSQL**, and **Tailwind CSS**. It offers a seamless experience for users to search, book, and manage flights, while providing administrators with a powerful dashboard to manage the entire platform.

## ✨ Features

### 👤 User Features

- **Flight Search**: Advanced search by city, date, class, and passengers.
- **Seat Selection**: Interactive visual seat map with class differentiation (Economy, Business, First).
- **Booking Flow**: Secure checkout process with **Midtrans** payment integration.
- **Ticket Management**: View, download, and manage booked tickets.
- **Authentication**: Secure sign-up/sign-in with Passport data encryption.

### 🛡️ Admin Dashboard

- **Analytics**: Real-time overview of revenue, active flights, and bookings.
- **Flight Management**: CRUD operations for flights, scheduling, and pricing.
- **Airplane Management**: Manage fleet inventory and configurations.
- **User & Ticket Management**: Oversee user roles and booking statuses.
- **Data Visualization**: Charts and tables for business insights.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Lucia Auth v3 / NextAuth
- **Styling**: Tailwind CSS, Shadcn/ui
- **Payment**: Midtrans Gateway
- **State Management**: TanStack Query
- **Testing**: Vitest (Unit), Playwright (E2E)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- PostgreSQL Database (Local or Cloud like Supabase/Neon)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/booking-ticket.git
   cd booking-ticket
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:port/db?schema=public"
   DIRECT_URL="postgresql://user:password@host:port/db?schema=public"

   # Auth (Example)
   AUTH_SECRET="your-secret-key"

   # Midtrans (Payment)
   MIDTRANS_SERVER_KEY="your-server-key"
   MIDTRANS_CLIENT_KEY="your-client-key"
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-client-key"

   # Public URL
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Setup Database**

   ```bash
   # Run migrations
   npx prisma migrate dev

   # Seed the database (Important!)
   npx prisma db seed
   ```

   _Note: Seeding creates default admin users and dummy flight data._

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

The project includes both unit and end-to-end tests.

```bash
# Run Unit Tests
npm test

# Run E2E Tests
npm run e2e
```

## 📂 Project Structure

```
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utilities and server actions
│   └── hooks/        # Custom React hooks
├── prisma/           # Database schema and seed script
├── public/           # Static assets
└── tests/            # Unit and E2E tests
```

## 📄 License

This project is licensed under the MIT License.
