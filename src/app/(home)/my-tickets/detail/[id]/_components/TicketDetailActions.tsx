"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Receipt, X } from "lucide-react";

interface TicketDetailActionsProps {
  ticketId: string;
  ticketRef: React.RefObject<HTMLDivElement | null>;
  ticketData: {
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
  };
}

export const DownloadTicketButton = ({
  ticketRef,
  ticketCode
}: {
  ticketRef: React.RefObject<HTMLDivElement | null>;
  ticketCode: string;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
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

  return (
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
  );
};

export const ViewReceiptButton = ({ ticketData }: { ticketData: TicketDetailActionsProps["ticketData"] }) => {
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
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
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
  passengerName,
  // ticketId will be used for API call in real implementation
  ticketId: _ticketId
}: {
  passengerName: string;
  ticketId: string;
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(passengerName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // In a real app, this would call an API to update the passenger
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowEdit(false);
    alert("Passenger details updated! (Demo only - refresh to see original data)");
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
