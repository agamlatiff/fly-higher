import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.describe("Login Page", () => {
    test("should display login form", async ({ page }) => {
      await page.goto("/sign-in");

      await expect(page.getByRole("heading", { name: /sign in|login/i })).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/password/i)).toBeVisible();
      await expect(page.getByRole("button", { name: /sign in|login/i })).toBeVisible();
    });

    test("should show validation errors for empty form", async ({ page }) => {
      await page.goto("/sign-in");

      // Click submit without filling form
      await page.getByRole("button", { name: /sign in|login/i }).click();

      // Check for validation messages
      await expect(page.getByText(/required|invalid/i)).toBeVisible();
    });

    test("should have link to registration", async ({ page }) => {
      await page.goto("/sign-in");

      const registerLink = page.getByRole("link", { name: /sign up|register|create account/i });
      await expect(registerLink).toBeVisible();
    });
  });

  test.describe("Register Page", () => {
    test("should display registration form", async ({ page }) => {
      await page.goto("/sign-up");

      await expect(page.getByRole("heading", { name: /sign up|register|create/i })).toBeVisible();
      await expect(page.getByLabel(/name/i)).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/password/i)).toBeVisible();
    });

    test("should have link to login", async ({ page }) => {
      await page.goto("/sign-up");

      const loginLink = page.getByRole("link", { name: /sign in|login|already have/i });
      await expect(loginLink).toBeVisible();
    });
  });
});
