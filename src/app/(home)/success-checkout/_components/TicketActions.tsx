// Ticket action buttons for success checkout page
"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface TicketActionsProps {
  ticketRef: React.RefObject<HTMLDivElement | null>;
  ticketCode: string;
}

const TicketActions = ({ ticketRef, ticketCode }: TicketActionsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#1a1a2e",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`FlyHigher-Ticket-${ticketCode}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download ticket. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareData = {
        title: "FlyHigher E-Ticket",
        text: `Check out my flight booking on FlyHigher! Ticket: ${ticketCode}`,
        url: window.location.href,
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `Check out my flight booking on FlyHigher!\nTicket: ${ticketCode}\n${window.location.href}`
        );
        alert("Booking link copied to clipboard!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
        alert("Failed to share. Please try again.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex-1 flex items-center justify-center gap-2 h-14 bg-accent hover:bg-sky-400 disabled:bg-gray-400 text-primary font-bold rounded-full shadow-lg shadow-accent/30 transition-all disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <>
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            Generating...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">download</span>
            Download E-Ticket
          </>
        )}
      </button>
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex-1 flex items-center justify-center gap-2 h-14 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 disabled:bg-gray-200 text-gray-900 dark:text-white font-bold rounded-full border-2 border-gray-200 dark:border-gray-700 transition-all disabled:cursor-not-allowed"
      >
        {isSharing ? (
          <>
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            Sharing...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">share</span>
            Share Booking
          </>
        )}
      </button>
    </div>
  );
};

export default TicketActions;
