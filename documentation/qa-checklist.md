# FlyHigher QA Test Checklist

## Quick Test Commands

```bash
# Automated Tests
npm run lint          # ESLint check
npm test              # Unit tests (Vitest)              [x]
npm run test:coverage # Coverage report
npm run e2e           # E2E tests (Playwright)           [x]
npm run e2e:headed    # E2E with browser visible

# Build Check
npm run build         # Production build                 [x]
```

---

## 1. Authentication Tests

### 1.1 Registration

| #   | Test Case               | Expected Result                    | Pass |
| --- | ----------------------- | ---------------------------------- | ---- |
| 1   | Navigate to `/sign-up`  | Registration form displayed        | [x]  |
| 2   | Submit empty form       | Validation errors shown            | [ ]  |
| 3   | Submit invalid email    | Email validation error             | [ ]  |
| 4   | Submit weak password    | Password requirements shown        | [ ]  |
| 5   | Submit valid form       | Account created, redirect to login | [ ]  |
| 6   | Register existing email | Error "Email already exists"       | [ ]  |

### 1.2 Login

| #   | Test Case                   | Expected Result             | Pass |
| --- | --------------------------- | --------------------------- | ---- |
| 1   | Navigate to `/sign-in`      | Login form displayed        | [x]  |
| 2   | Submit empty form           | Validation errors shown     | [x]  |
| 3   | Submit wrong credentials    | Error message shown         | [ ]  |
| 4   | Submit valid credentials    | Logged in, redirect to home | [ ]  |
| 5   | Click "Sign in with Google" | Google OAuth flow works     | [ ]  |

### 1.3 Logout

| #   | Test Case                     | Expected Result                 | Pass |
| --- | ----------------------------- | ------------------------------- | ---- |
| 1   | Click logout button           | Session ended, redirect to home | [ ]  |
| 2   | Try accessing protected route | Redirect to login               | [ ]  |

---

## 2. Homepage & Navigation

| #   | Test Case              | Expected Result           | Pass |
| --- | ---------------------- | ------------------------- | ---- |
| 1   | Load homepage `/`      | Hero section visible      | [x]  |
| 2   | Toggle dark mode       | Theme switches correctly  | [x]  |
| 3   | Click navigation links | Navigate to correct pages | [x]  |
| 4   | View on mobile (375px) | Responsive layout works   | [ ]  |
| 5   | View on tablet (768px) | Responsive layout works   | [ ]  |

---

## 3. Flight Search & Browsing

### 3.1 Available Flights Page

| #   | Test Case                        | Expected Result        | Pass |
| --- | -------------------------------- | ---------------------- | ---- |
| 1   | Navigate to `/available-flights` | Flight list displayed  | [x]  |
| 2   | Flights show departure/arrival   | Route info visible     | [ ]  |
| 3   | Flights show price               | Price in Rupiah format | [ ]  |
| 4   | Flights show airline/plane       | Plane info visible     | [ ]  |
| 5   | Pagination works                 | Navigate between pages | [ ]  |

### 3.2 Flight Filtering

| #   | Test Case                  | Expected Result            | Pass |
| --- | -------------------------- | -------------------------- | ---- |
| 1   | Filter by departure city   | Results filtered correctly | [ ]  |
| 2   | Filter by destination city | Results filtered correctly | [ ]  |
| 3   | Filter by date             | Results filtered correctly | [ ]  |
| 4   | Clear filters              | All flights shown          | [ ]  |

---

## 4. Seat Selection

### 4.1 Seat Map

| #   | Test Case                       | Expected Result                   | Pass |
| --- | ------------------------------- | --------------------------------- | ---- |
| 1   | Navigate to `/choose-seat/[id]` | Seat map displayed                | [x]  |
| 2   | Flight info shown               | Departure/arrival/date visible    | [ ]  |
| 3   | Seat legend displayed           | Available/Occupied/Legroom legend | [ ]  |
| 4   | Class toggle works              | Economy/Business/First toggle     | [ ]  |

### 4.2 Seat Selection

| #   | Test Case             | Expected Result                | Pass |
| --- | --------------------- | ------------------------------ | ---- |
| 1   | Click available seat  | Seat selected (highlighted)    | [ ]  |
| 2   | Click occupied seat   | Cannot select                  | [ ]  |
| 3   | Seat tooltip on hover | Class/position/price shown     | [ ]  |
| 4   | Summary updates       | Selected seat shown in summary | [ ]  |

### 4.3 Quick Select

| #   | Test Case              | Expected Result               | Pass |
| --- | ---------------------- | ----------------------------- | ---- |
| 1   | Click "Best Available" | First available seat selected | [ ]  |
| 2   | Click "Window"         | Window seat selected          | [ ]  |
| 3   | Click "Aisle"          | Aisle seat selected           | [ ]  |

### 4.4 Seat Comparison

| #   | Test Case                  | Expected Result        | Pass |
| --- | -------------------------- | ---------------------- | ---- |
| 1   | Long press seat (mobile)   | Seat added to compare  | [ ]  |
| 2   | Right-click seat (desktop) | Seat added to compare  | [ ]  |
| 3   | Compare panel shows        | Up to 3 seats compared | [ ]  |
| 4   | Click "Select" in compare  | Seat selected          | [ ]  |
| 5   | Click "Clear All"          | Compare panel cleared  | [ ]  |

---

## 5. Checkout & Payment

### 5.1 Checkout Page

| #   | Test Case               | Expected Result           | Pass |
| --- | ----------------------- | ------------------------- | ---- |
| 1   | Navigate to `/checkout` | Checkout page displayed   | [ ]  |
| 2   | Booking summary shown   | Flight/seat/price visible | [ ]  |
| 3   | Payment methods shown   | Credit Card/E-Wallet/QRIS | [ ]  |
| 4   | User not logged in      | Redirect to login         | [ ]  |

### 5.2 Payment (Midtrans)

| #   | Test Case          | Expected Result                | Pass |
| --- | ------------------ | ------------------------------ | ---- |
| 1   | Click "Pay" button | Midtrans popup opens           | [ ]  |
| 2   | Complete payment   | Redirect to success page       | [ ]  |
| 3   | Cancel payment     | Popup closes, stay on checkout | [ ]  |
| 4   | Payment fails      | Error message shown            | [ ]  |

---

## 6. My Tickets

| #   | Test Case                 | Expected Result           | Pass |
| --- | ------------------------- | ------------------------- | ---- |
| 1   | Navigate to `/my-tickets` | Ticket list displayed     | [ ]  |
| 2   | Tickets show status       | PENDING/SUCCESS/CANCELED  | [ ]  |
| 3   | Click ticket              | Navigate to ticket detail | [ ]  |
| 4   | Ticket detail shows QR    | QR code visible           | [ ]  |
| 5   | Download/print ticket     | Download works            | [ ]  |

---

## 7. Admin Dashboard

### 7.1 Dashboard Access

| #   | Test Case          | Expected Result        | Pass |
| --- | ------------------ | ---------------------- | ---- |
| 1   | Login as admin     | Access to `/dashboard` | [ ]  |
| 2   | Login as customer  | No access to dashboard | [ ]  |
| 3   | Dashboard overview | Stats cards visible    | [ ]  |

### 7.2 Flights Management

| #   | Test Case         | Expected Result              | Pass |
| --- | ----------------- | ---------------------------- | ---- |
| 1   | View flights list | All flights displayed        | [ ]  |
| 2   | Search flights    | Filter by route/date         | [ ]  |
| 3   | Create new flight | Form submits, flight created | [ ]  |
| 4   | Edit flight       | Changes saved                | [ ]  |
| 5   | Delete flight     | Flight removed               | [ ]  |

### 7.3 Airplanes Management

| #   | Test Case           | Expected Result             | Pass |
| --- | ------------------- | --------------------------- | ---- |
| 1   | View airplanes list | All planes displayed        | [ ]  |
| 2   | Create new airplane | Form submits, plane created | [ ]  |
| 3   | Edit airplane       | Changes saved               | [ ]  |
| 4   | Delete airplane     | Plane removed               | [ ]  |

### 7.4 Users Management

| #   | Test Case         | Expected Result      | Pass |
| --- | ----------------- | -------------------- | ---- |
| 1   | View users list   | All users displayed  | [ ]  |
| 2   | Search users      | Filter by name/email | [ ]  |
| 3   | View user details | User info displayed  | [ ]  |

### 7.5 Tickets Management

| #   | Test Case           | Expected Result          | Pass |
| --- | ------------------- | ------------------------ | ---- |
| 1   | View tickets list   | All tickets displayed    | [ ]  |
| 2   | Filter by status    | PENDING/SUCCESS/CANCELED | [ ]  |
| 3   | View ticket details | Full booking info        | [ ]  |

---

## 8. Performance & Accessibility

| #   | Test Case                  | Expected Result         | Pass |
| --- | -------------------------- | ----------------------- | ---- |
| 1   | Lighthouse score (mobile)  | Score > 70              | [ ]  |
| 2   | Lighthouse score (desktop) | Score > 80              | [ ]  |
| 3   | Web Vitals (LCP)           | < 2.5s                  | [ ]  |
| 4   | Web Vitals (FID)           | < 100ms                 | [ ]  |
| 5   | Web Vitals (CLS)           | < 0.1                   | [ ]  |
| 6   | Keyboard navigation        | All elements accessible | [ ]  |
| 7   | Screen reader              | Proper ARIA labels      | [ ]  |

---

## 9. Cross-Browser Testing

| Browser | Desktop | Mobile | Pass |
| ------- | ------- | ------ | ---- |
| Chrome  | [ ]     | [ ]    | [ ]  |
| Firefox | [ ]     | [ ]    | [ ]  |
| Safari  | [ ]     | [ ]    | [ ]  |
| Edge    | [ ]     | [ ]    | [ ]  |

---

## 10. Error Handling

| #   | Test Case       | Expected Result      | Pass |
| --- | --------------- | -------------------- | ---- |
| 1   | Invalid URL     | 404 page displayed   | [ ]  |
| 2   | Server error    | 500 error page       | [ ]  |
| 3   | Network offline | Offline indicator    | [ ]  |
| 4   | Form validation | Clear error messages | [ ]  |
| 5   | API errors      | Toast notification   | [ ]  |

---

## Test Execution Log

| Date | Tester | Version | Tests Passed | Tests Failed | Notes |
| ---- | ------ | ------- | ------------ | ------------ | ----- |
|      |        |         |              |              |       |

---

## Environment Info

- **URL**: http://localhost:3000
- **Node**: v18+
- **Browser**: Chrome latest
- **Test Data**: `npx prisma db seed`
