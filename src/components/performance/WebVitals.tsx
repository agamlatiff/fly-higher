"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Web Vitals Reporter Component
 * Tracks Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)  
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: Math.round(metric.value),
        rating: metric.rating,
        id: metric.id,
      });
    }

    // In production, Web Vitals can be sent to analytics services
    // Vercel Analytics automatically collects these if you have it enabled
    // For custom analytics, add your tracking code here
    // Example: 
    // if (process.env.NODE_ENV === "production" && window.va) {
    //   window.va.track(metric.name, { value: metric.value });
    // }
  });

  return null;
}

/**
 * Performance metrics helper
 */
export function getPerformanceRating(metric: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return "good";

  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}
