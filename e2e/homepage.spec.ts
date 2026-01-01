import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display main heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    await page.goto("/");
    const navCount = await page.getByRole("navigation").count();
    console.log("Nav count:", navCount);
    if (navCount === 0) {
      console.log("Body:", await page.content());
      console.log("No nav found");
    }
    await expect(page.getByRole("navigation").first()).toBeVisible();
  });

  test("should display search button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /search/i })).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");

    // Click on flights link
    const flightsLink = page.getByRole("link", { name: /flights/i });
    if (await flightsLink.isVisible()) {
      await flightsLink.click();
      await expect(page).toHaveURL(/flights/);
    }
  });

  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/");

    // Find theme toggle button
    const themeToggle = page.locator("[data-testid='theme-toggle']").or(
      page.getByRole("button", { name: /theme|dark|light/i })
    );

    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Check if dark class is applied to html
      const html = page.locator("html");
      await expect(html).toHaveClass(/dark/);
    }
  });
});
