// Ticket detail action buttons - download, receipt, edit
"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Receipt, X, Plane, CheckCircle, AlertTriangle } from "lucide-react";

interface TicketData {
  code: string;
  passengerName: string;
  departureCity: string;
  departureCityCode: string;
  destinationCity: string;
  destinationCityCode: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  seatNumber: string;
  seatType: string;
  price: number;
  planeName: string;
}

export const DownloadTicketButton = ({
  ticketData
}: {
  ticketRef?: React.RefObject<HTMLDivElement | null>;
  ticketCode: string;
  ticketData: TicketData;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const ticketDownloadRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setShowTicket(true);
  };

  useEffect(() => {
    const generatePDF = async () => {
      if (!showTicket || !ticketDownloadRef.current) return;

      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const canvas = await html2canvas(ticketDownloadRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");

        // Use A5 paper size (148mm x 210mm) for compact ticket
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a5",
        });

        // Calculate dimensions to fit image in A5
        const pageWidth = 148;
        const pageHeight = 210;
        const imgWidth = pageWidth - 20; // 10mm margin on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const xOffset = 10; // Center horizontally
        const yOffset = (pageHeight - imgHeight) / 2; // Center vertically

        pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
        pdf.save(`FlyHigher-Ticket-${ticketData.code}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to download ticket. Please try again.");
      } finally {
        setIsDownloading(false);
        setShowTicket(false);
      }
    };

    if (showTicket) {
      generatePDF();
    }
  }, [showTicket, ticketData.code]);

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="z-10 flex items-center justify-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors h-10 px-4 text-text-dark dark:text-white text-sm font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <>
            <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Ticket</span>
          </>
        )}
      </button>

      {/* Hidden Ticket Template for Download */}
      {showTicket && (
        <div className="fixed -left-[9999px] top-0">
          <div
            ref={ticketDownloadRef}
            className="w-[420px] bg-white p-5"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-dashed border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">FlyHigher</h1>
                  <p className="text-[10px] text-gray-500">E-Ticket / Boarding Pass</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-emerald-100 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-bold text-xs">CONFIRMED</span>
              </div>
            </div>

            {/* Flight Route */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-black text-gray-900">{ticketData.departureCityCode}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{ticketData.departureCity}</p>
                  <p className="text-sm font-bold text-sky-600 mt-1">{ticketData.departureTime}</p>
                </div>

                <div className="flex-1 mx-4 relative">
                  <div className="h-0.5 bg-gray-300 w-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full">
                    <Plane className="w-4 h-4 text-sky-500 rotate-90" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-black text-gray-900">{ticketData.destinationCityCode}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{ticketData.destinationCity}</p>
                  <p className="text-sm font-bold text-sky-600 mt-1">{ticketData.arrivalTime}</p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-0.5">Passenger</p>
                <p className="font-bold text-gray-900 text-xs">{ticketData.passengerName}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-0.5">Date</p>
                <p className="font-bold text-gray-900 text-xs">{ticketData.departureDate}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-0.5">Aircraft</p>
                <p className="font-bold text-gray-900 text-xs">{ticketData.planeName}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-0.5">Seat</p>
                <p className="font-bold text-gray-900 text-xs">{ticketData.seatNumber}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-0.5">Class</p>
                <p className="font-bold text-gray-900 text-xs">{ticketData.seatType}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-0.5">Booking Ref</p>
                <p className="font-bold text-gray-900 text-xs font-mono">{ticketData.code}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[9px] text-gray-500">Total Paid</p>
                  <p className="text-base font-black text-sky-600">Rp {ticketData.price.toLocaleString("id-ID")}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-400">booking@flyhigher.com</p>
                  <p className="text-[9px] text-gray-400">www.flyhigher.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ViewReceiptButton = ({ ticketData }: { ticketData: TicketData }) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Use A5 paper size (148mm x 210mm) for compact receipt
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      // Calculate dimensions to fit image in A5
      const pageWidth = 148;
      const pageHeight = 210;
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xOffset = 10; // Center horizontally
      const yOffset = (pageHeight - imgHeight) / 2; // Center vertically

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`FlyHigher-Receipt-${ticketData.code}.pdf`);
    } catch (error) {
      console.error("Error generating receipt PDF:", error);
      alert("Failed to download receipt. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowReceipt(true)}
        className="w-full mt-6 py-2.5 rounded-lg border border-sky-primary text-sky-primary font-bold text-sm hover:bg-sky-primary/5 dark:hover:bg-sky-primary/10 transition-colors flex items-center justify-center gap-2"
      >
        <Receipt className="w-4 h-4" />
        View Receipt
      </button>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Receipt</h3>
              <button
                onClick={() => setShowReceipt(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Receipt Content */}
            <div ref={receiptRef} className="p-6 bg-white">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sky-500">flight</span>
                  <span className="font-bold text-gray-900">FlyHigher</span>
                </div>
                <p className="text-sm text-gray-500">Payment Receipt</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Receipt No.</span>
                  <span className="font-mono font-bold text-gray-900">{ticketData.code}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Passenger</span>
                  <span className="text-gray-900 font-medium">{ticketData.passengerName}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Flight</span>
                  <span className="text-gray-900">{ticketData.departureCityCode} → {ticketData.destinationCityCode}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-900">{ticketData.departureDate}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Seat</span>
                  <span className="text-gray-900">{ticketData.seatNumber} ({ticketData.seatType})</span>
                </div>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Base Fare</span>
                  <span className="text-gray-900">Rp {ticketData.price.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Seat Selection</span>
                  <span className="text-gray-900">Rp 0</span>
                </div>

                <div className="border-t border-gray-200 my-4" />

                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total Paid</span>
                  <span className="font-bold text-sky-600">Rp {ticketData.price.toLocaleString("id-ID")}</span>
                </div>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="text-center text-xs text-gray-400">
                  <p>Thank you for flying with FlyHigher!</p>
                  <p className="mt-1">booking@flyhigher.com</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleDownloadReceipt}
                disabled={isDownloading}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Receipt
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const EditPassengerButton = ({
  ticketId,
  passengerName,
  onUpdate,
}: {
  ticketId: string;
  passengerName: string;
  onUpdate?: () => void;
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(passengerName);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Passenger name is required");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const { updatePassengerName } = await import("../../../lib/actions");
      const result = await updatePassengerName(ticketId, name.trim());

      if (result.success) {
        setShowEdit(false);
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        setError(result.error || "Failed to update passenger");
      }
    } catch (err) {
      console.error("Error updating passenger:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowEdit(true)}
        className="text-sky-primary dark:text-accent text-sm font-semibold hover:underline"
      >
        Edit
      </button>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Passenger</h3>
              <button
                onClick={() => setShowEdit(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Passenger Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => setShowEdit(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export const CancelTicketButton = ({ ticketId }: { ticketId: string }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    setIsCancelling(true);
    setError(null);

    try {
      const { cancelTicket } = await import("../../../lib/actions");
      const result = await cancelTicket(ticketId);

      if (result.success) {
        setShowConfirm(false);
        window.location.reload();
      } else {
        setError(result.error || "Failed to cancel ticket");
        setIsCancelling(false);
      }
    } catch (err) {
      console.error("Error cancelling ticket:", err);
      setError("An error occurred. Please try again.");
      setIsCancelling(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full py-2 rounded-lg bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
      >
        Cancel Booking
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cancel Booking?</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone and may be subject to cancellation fees.
              </p>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
