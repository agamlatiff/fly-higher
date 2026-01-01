import { describe, it, expect } from "vitest";
import {
  rupiahFormat,
  dateFormat,
  cn,
  SEAT_VALUES,
} from "@/lib/utils";

describe("rupiahFormat", () => {
  it("formats number to Indonesian Rupiah", () => {
    // Actual format includes ",00" decimals
    expect(rupiahFormat(1000000)).toContain("1.000.000");
    expect(rupiahFormat(50000)).toContain("50.000");
    expect(rupiahFormat(0)).toContain("0");
  });

  it("includes Rp currency symbol", () => {
    expect(rupiahFormat(50000)).toMatch(/Rp/);
  });
});

describe("dateFormat", () => {
  it("formats date string correctly", () => {
    const date = new Date("2024-12-27");
    const formatted = dateFormat(date);
    expect(formatted).toContain("Dec");
    expect(formatted).toContain("27");
    expect(formatted).toContain("2024");
  });
});

describe("cn (classnames utility)", () => {
  it("merges class names", () => {
    const result = cn("base-class", "additional-class");
    expect(result).toContain("base-class");
    expect(result).toContain("additional-class");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const result = cn("base", isActive && "active");
    expect(result).toContain("active");
  });

  it("filters falsy values", () => {
    const result = cn("base", false && "hidden", null, undefined);
    expect(result).toBe("base");
  });
});

describe("SEAT_VALUES", () => {
  it("has correct economy values", () => {
    expect(SEAT_VALUES.ECONOMY.label).toBe("Economy");
    expect(SEAT_VALUES.ECONOMY.additionalPrice).toBe(0);
  });

  it("has correct business values", () => {
    // Note: typo in actual code is "Bussiness"
    expect(SEAT_VALUES.BUSSINESS.label).toBe("Bussiness");
    expect(SEAT_VALUES.BUSSINESS.additionalPrice).toBeGreaterThan(0);
  });

  it("has correct first class values", () => {
    expect(SEAT_VALUES.FIRST.label).toBe("First");
    expect(SEAT_VALUES.FIRST.additionalPrice).toBeGreaterThan(
      SEAT_VALUES.BUSSINESS.additionalPrice
    );
  });
});
