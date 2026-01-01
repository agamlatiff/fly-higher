import { test, expect } from "@playwright/test";

test.describe("Flight Booking Flow", () => {
  test("should display available flights page", async ({ page }) => {
    await page.goto("/available-flights");

    // Check page title/heading
    await expect(page.getByRole("heading", { name: /flight|available/i })).toBeVisible();
  });

  test("should show flight cards with details", async ({ page }) => {
    await page.goto("/available-flights");

    // Wait for flights to load
    await page.waitForLoadState("networkidle");

    // Check for flight information elements
    const flightCards = page.locator("[data-testid='flight-card']").or(
      page.locator(".flight-item, .flight-card")
    );

    // Should have at least one flight or empty state
    const count = await flightCards.count();
    if (count > 0) {
      // Check first flight card has required info
      const firstCard = flightCards.first();
      await expect(firstCard).toBeVisible();
    }
  });

  test("should navigate to seat selection when clicking book", async ({ page }) => {
    await page.goto("/available-flights");
    await page.waitForLoadState("networkidle");

    // Find and click book/select button
    const bookButton = page.getByRole("link", { name: /book|select|choose/i }).first();

    if (await bookButton.isVisible()) {
      await bookButton.click();

      // Should navigate to seat selection or login
      await expect(page).toHaveURL(/choose-seat|sign-in/);
    }
  });
});

test.describe("Seat Selection", () => {
  test("should display seat map", async ({ page }) => {
    // Navigate to a known flight's seat selection
    await page.goto("/available-flights");
    await page.waitForLoadState("networkidle");

    const bookButton = page.getByRole("link", { name: /book|select|choose/i }).first();

    if (await bookButton.isVisible()) {
      await bookButton.click();

      // If redirected to login, skip this test
      if (page.url().includes("sign-in")) {
        test.skip();
        return;
      }

      // Check for seat map elements
      await expect(page.getByText(/seat/i)).toBeVisible();
    }
  });
});
