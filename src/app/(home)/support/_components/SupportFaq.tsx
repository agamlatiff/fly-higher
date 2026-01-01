"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I book a flight?",
    answer: "Simply search for your destination on our homepage, select your preferred flight, choose your seat, and complete the payment. You'll receive an e-ticket via email.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking up to 24 hours before departure. Cancellation fees may apply depending on the airline and fare type.",
  },
  {
    question: "How do I check my flight status?",
    answer: "Go to 'My Tickets' in your account to see real-time flight status updates for all your bookings.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, bank transfers, and various digital wallets including GoPay, OVO, and Dana.",
  },
  {
    question: "How do I get my boarding pass?",
    answer: "After booking, you can download your e-ticket from the confirmation page or 'My Tickets' section. Mobile boarding passes are sent 24 hours before departure.",
  },
];

export default function SupportFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <span
                className={`material-symbols-outlined text-accent transition-transform ${openFaq === index ? "rotate-180" : ""
                  }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === index && (
              <div className="px-5 pb-5">
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
