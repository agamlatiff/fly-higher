import bcrypt from "bcryptjs";
import { PrismaClient, TypeSeat, StatusTicket, RoleUser } from "@prisma/client";

const prisma = new PrismaClient();

// ============================================
// CONFIGURATION
// ============================================
const CLEAR_EXISTING_DATA = true; // Set to false to append data

// ============================================
// HELPER FUNCTIONS
// ============================================
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTicketCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "FH-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

// ============================================
// SEED DATA
// ============================================

// Airplanes data - using external URLs for images
const airplanesData = [
  { code: "GA-738", name: "Boeing 737-800", image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400" },
  { code: "GA-320", name: "Airbus A320neo", image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400" },
  { code: "SJ-195", name: "Boeing 737 MAX 8", image: "https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a?w=400" },
  { code: "QG-320", name: "Airbus A320-200", image: "https://images.unsplash.com/photo-1583202075824-0229f7368fa9?w=400" },
  { code: "JT-739", name: "Boeing 737-900ER", image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400" },
  { code: "ID-333", name: "Airbus A330-300", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400" },
  { code: "GA-773", name: "Boeing 777-300ER", image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=400" },
  { code: "SQ-350", name: "Airbus A350-900", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400" },
];

// Indonesian domestic routes
const routes = [
  { from: "Jakarta", fromCode: "CGK", to: "Bali", toCode: "DPS", duration: 2 },
  { from: "Jakarta", fromCode: "CGK", to: "Surabaya", toCode: "SUB", duration: 1.5 },
  { from: "Jakarta", fromCode: "CGK", to: "Yogyakarta", toCode: "JOG", duration: 1 },
  { from: "Jakarta", fromCode: "CGK", to: "Makassar", toCode: "UPG", duration: 2.5 },
  { from: "Jakarta", fromCode: "CGK", to: "Medan", toCode: "KNO", duration: 2 },
  { from: "Surabaya", fromCode: "SUB", to: "Bali", toCode: "DPS", duration: 0.5 },
  { from: "Bali", fromCode: "DPS", to: "Lombok", toCode: "LOP", duration: 0.5 },
  { from: "Jakarta", fromCode: "CGK", to: "Bandung", toCode: "BDO", duration: 0.75 },
  { from: "Jakarta", fromCode: "CGK", to: "Semarang", toCode: "SRG", duration: 1 },
  { from: "Surabaya", fromCode: "SUB", to: "Makassar", toCode: "UPG", duration: 1.5 },
];

// Customer names
const customerNames = [
  "Budi Santoso",
  "Siti Rahayu",
  "Ahmad Hidayat",
  "Dewi Lestari",
  "Rizky Pratama",
  "Putri Wulandari",
  "Agus Setiawan",
  "Maya Sari",
  "Doni Kurniawan",
  "Ratna Dewi",
  "Eko Prasetyo",
  "Linda Permata",
  "Hendra Wijaya",
  "Novi Anggraini",
  "Fajar Nugroho",
];

// ============================================
// SEEDER FUNCTIONS
// ============================================

async function clearDatabase() {
  console.log("🗑️  Clearing existing data...");
  await prisma.ticket.deleteMany();
  await prisma.flightSeat.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.airplane.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Database cleared");
}

async function seedUsers() {
  console.log("\n👥 Seeding users...");
  const password = bcrypt.hashSync("password123", 10);
  const adminPassword = bcrypt.hashSync("admin123", 10);

  // Admin users
  const admins = [
    { email: "admin@flyhigher.com", name: "Super Admin", role: RoleUser.ADMIN, password: adminPassword },
    { email: "manager@flyhigher.com", name: "Flight Manager", role: RoleUser.ADMIN, password: adminPassword },
  ];

  // Customer users
  const customers = customerNames.map((name, i) => ({
    email: `${name.toLowerCase().replace(" ", ".")}@gmail.com`,
    name,
    role: RoleUser.CUSTOMER,
    password,
    passport: i % 3 === 0 ? `A${randomInt(10000000, 99999999)}` : null,
  }));

  const createdUsers = await prisma.user.createMany({
    data: [...admins, ...customers],
  });

  console.log(`✅ Created ${createdUsers.count} users`);
  return prisma.user.findMany();
}

async function seedAirplanes() {
  console.log("\n✈️  Seeding airplanes...");

  const createdAirplanes = await prisma.airplane.createMany({
    data: airplanesData,
  });

  console.log(`✅ Created ${createdAirplanes.count} airplanes`);
  return prisma.airplane.findMany();
}

async function seedFlights(airplanes: Awaited<ReturnType<typeof seedAirplanes>>) {
  console.log("\n🛫 Seeding flights...");

  const flights = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate 30 flights with varying dates
  for (let i = 0; i < 30; i++) {
    const route = randomElement(routes);
    const airplane = randomElement(airplanes);
    const dayOffset = randomInt(-7, 14); // Past week to 2 weeks ahead
    const departureDate = addDays(today, dayOffset);
    departureDate.setHours(randomInt(6, 22), randomInt(0, 59), 0, 0);
    const arrivalDate = addHours(departureDate, route.duration);
    const basePrice = randomInt(500000, 2500000);

    const slug = `${route.fromCode.toLowerCase()}-${route.toCode.toLowerCase()}-${departureDate.toISOString().split("T")[0]}`;

    flights.push({
      slug: `${slug}-${i}`,
      planeId: airplane.id,
      departureCity: route.from,
      departureCityCode: route.fromCode,
      destinationCity: route.to,
      destinationCityCode: route.toCode,
      departureDate,
      arrivalDate,
      price: basePrice,
    });
  }

  const createdFlights = await prisma.flight.createMany({
    data: flights,
  });

  console.log(`✅ Created ${createdFlights.count} flights`);
  return prisma.flight.findMany();
}

async function seedFlightSeats(flights: Awaited<ReturnType<typeof seedFlights>>) {
  console.log("\n💺 Seeding flight seats...");

  const allSeats = [];

  for (const flight of flights) {
    // Generate seats per flight
    // Economy: Rows 10-30, Seats A-F (126 seats)
    // Business: Rows 4-9, Seats A-D (24 seats)
    // First: Rows 1-3, Seats A-B (6 seats)

    // First Class
    for (let row = 1; row <= 3; row++) {
      for (const seat of ["A", "B"]) {
        allSeats.push({
          flightId: flight.id,
          seatNumber: `${row}${seat}`,
          type: TypeSeat.FIRST,
          isBooked: false,
        });
      }
    }

    // Business Class
    for (let row = 4; row <= 9; row++) {
      for (const seat of ["A", "B", "C", "D"]) {
        allSeats.push({
          flightId: flight.id,
          seatNumber: `${row}${seat}`,
          type: TypeSeat.BUSSINESS,
          isBooked: false,
        });
      }
    }

    // Economy Class
    for (let row = 10; row <= 30; row++) {
      for (const seat of ["A", "B", "C", "D", "E", "F"]) {
        allSeats.push({
          flightId: flight.id,
          seatNumber: `${row}${seat}`,
          type: TypeSeat.ECONOMY,
          isBooked: false,
        });
      }
    }
  }

  // Batch insert in chunks to avoid timeout
  const chunkSize = 500;
  for (let i = 0; i < allSeats.length; i += chunkSize) {
    const chunk = allSeats.slice(i, i + chunkSize);
    await prisma.flightSeat.createMany({ data: chunk });
  }

  console.log(`✅ Created ${allSeats.length} flight seats`);
  return prisma.flightSeat.findMany();
}

async function seedTickets(
  users: Awaited<ReturnType<typeof seedUsers>>,
  flights: Awaited<ReturnType<typeof seedFlights>>
) {
  console.log("\n🎫 Seeding tickets...");

  const customers = users.filter((u) => u.role === "CUSTOMER");
  const tickets = [];
  const statuses = [StatusTicket.SUCCESS, StatusTicket.SUCCESS, StatusTicket.PENDING, StatusTicket.FAILED];

  // Get available seats per flight
  for (let i = 0; i < 40; i++) {
    const flight = randomElement(flights);
    const customer = randomElement(customers);
    const status = randomElement(statuses);

    // Find an available seat for this flight
    const availableSeat = await prisma.flightSeat.findFirst({
      where: {
        flightId: flight.id,
        isBooked: false,
      },
    });

    if (!availableSeat) continue;

    // Mark seat as booked
    await prisma.flightSeat.update({
      where: { id: availableSeat.id },
      data: { isBooked: true },
    });

    // Calculate price based on seat type
    let price = flight.price;
    if (availableSeat.type === "BUSSINESS") price = Math.round(price * 1.5);
    if (availableSeat.type === "FIRST") price = Math.round(price * 2.5);

    const bookingDate = addDays(new Date(), randomInt(-30, -1));

    tickets.push({
      code: generateTicketCode(),
      slug: `booking-${generateTicketCode().toLowerCase()}`,
      flightId: flight.id,
      customerId: customer.id,
      seatId: availableSeat.id,
      bookingDate,
      price: BigInt(price),
      status,
    });
  }

  for (const ticket of tickets) {
    await prisma.ticket.create({ data: ticket });
  }

  console.log(`✅ Created ${tickets.length} tickets`);
}

// ============================================
// MAIN FUNCTION
// ============================================

async function main() {
  console.log("🌱 Starting database seeding...\n");
  console.log("==========================================");

  if (CLEAR_EXISTING_DATA) {
    await clearDatabase();
  }

  const users = await seedUsers();
  const airplanes = await seedAirplanes();
  const flights = await seedFlights(airplanes);
  await seedFlightSeats(flights);
  await seedTickets(users, flights);

  console.log("\n==========================================");
  console.log("🎉 Seeding completed successfully!");
  console.log("==========================================");

  // Summary
  const summary = await Promise.all([
    prisma.user.count(),
    prisma.airplane.count(),
    prisma.flight.count(),
    prisma.flightSeat.count(),
    prisma.ticket.count(),
  ]);

  console.log("\n📊 Database Summary:");
  console.log(`   Users:        ${summary[0]}`);
  console.log(`   Airplanes:    ${summary[1]}`);
  console.log(`   Flights:      ${summary[2]}`);
  console.log(`   Flight Seats: ${summary[3]}`);
  console.log(`   Tickets:      ${summary[4]}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });