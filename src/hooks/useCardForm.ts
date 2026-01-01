"use client";

import { useState, useCallback } from "react";

/**
 * Format credit card number with spaces every 4 digits
 * @example formatCardNumber("1234567890123456") => "1234 5678 9012 3456"
 */
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.slice(0, 16);
  return limited.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Format expiry date as MM/YY
 * @example formatExpiry("1225") => "12/25"
 */
export function formatExpiry(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.slice(0, 4);
  if (limited.length >= 2) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  }
  return limited;
}

/**
 * Detect card type from card number
 */
export function detectCardType(cardNumber: string): "visa" | "mastercard" | "amex" | "discover" | null {
  const cleaned = cardNumber.replace(/\D/g, "");

  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";

  return null;
}

/**
 * Validate Luhn algorithm for card number
 */
export function validateCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, "");
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate expiry date
 */
export function validateExpiry(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt(`20${match[2]}`, 10);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

/**
 * Validate CVC
 */
export function validateCVC(cvc: string, cardType: ReturnType<typeof detectCardType>): boolean {
  const cleaned = cvc.replace(/\D/g, "");
  // AMEX has 4 digit CVC, others have 3
  const expectedLength = cardType === "amex" ? 4 : 3;
  return cleaned.length === expectedLength;
}

export interface CardFormState {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

export interface CardFormErrors {
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvc?: string;
}

/**
 * Hook for managing credit card form state with validation
 */
export function useCardForm(initialName = "") {
  const [formState, setFormState] = useState<CardFormState>({
    cardNumber: "",
    cardName: initialName,
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState<CardFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const cardType = detectCardType(formState.cardNumber);

  const handleCardNumberChange = useCallback((value: string) => {
    const formatted = formatCardNumber(value);
    setFormState((prev) => ({ ...prev, cardNumber: formatted }));
  }, []);

  const handleExpiryChange = useCallback((value: string) => {
    const formatted = formatExpiry(value);
    setFormState((prev) => ({ ...prev, expiry: formatted }));
  }, []);

  const handleCVCChange = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, cardType === "amex" ? 4 : 3);
    setFormState((prev) => ({ ...prev, cvc: cleaned }));
  }, [cardType]);

  const handleNameChange = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, cardName: value }));
  }, []);

  const handleBlur = useCallback((field: keyof CardFormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: CardFormErrors = {};

    // Card number validation
    const cleanedCardNumber = formState.cardNumber.replace(/\s/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!validateCardNumber(cleanedCardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    // Name validation
    if (!formState.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    } else if (formState.cardName.trim().length < 2) {
      newErrors.cardName = "Name is too short";
    }

    // Expiry validation
    if (!formState.expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!validateExpiry(formState.expiry)) {
      newErrors.expiry = "Invalid or expired date";
    }

    // CVC validation
    if (!formState.cvc) {
      newErrors.cvc = "CVC is required";
    } else if (!validateCVC(formState.cvc, cardType)) {
      newErrors.cvc = `Must be ${cardType === "amex" ? "4" : "3"} digits`;
    }

    setErrors(newErrors);
    setTouched({ cardNumber: true, cardName: true, expiry: true, cvc: true });

    return Object.keys(newErrors).length === 0;
  }, [formState, cardType]);

  return {
    formState,
    errors,
    touched,
    cardType,
    handleCardNumberChange,
    handleExpiryChange,
    handleCVCChange,
    handleNameChange,
    handleBlur,
    validate,
  };
}
