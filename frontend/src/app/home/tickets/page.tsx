"use client";
import React, { useState } from "react";
import { UserNavigation } from "@/app/components/userNavigation";
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt, FaQrcode } from "react-icons/fa";
import { format } from "date-fns";
import QRCode from "react-qr-code";

function MyTicketsPage() {
  // mockup tickets
  const tickets = [
    {
      id: "TKT12345",
      eventTitle: "Summer Music Festival",
      date: new Date("2025-09-20"),
      location: "Lagos, Nigeria",
      category: "VIP",
      seat: "Section A, Seat 15",
      status: "Upcoming",
    },
    {
      id: "TKT67890",
      eventTitle: "Tech Conference 2025",
      date: new Date("2025-10-05"),
      location: "Abuja, Nigeria",
      category: "Regular",
      seat: "Section C, Seat 42",
      status: "Active",
    },
  ];

  const [qrOpen, setQrOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(
    null
  );

  const openQrModal = (ticket: typeof tickets[0]) => {
    setSelectedTicket(ticket);
    setQrOpen(true);
  };

  const closeQrModal = () => {
    setQrOpen(false);
    setSelectedTicket(null);
  };

  // helper for status badge
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Expired":
        return "bg-gray-200 text-gray-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <>
      <UserNavigation />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">🎟 My Tickets</h1>

        {tickets.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            <p>No tickets found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="relative rounded-2xl border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all"
              >
                {/* status badge */}
                <span
                  className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${getStatusClasses(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>

                {/* top section */}
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {ticket.eventTitle}
                    </h2>
                    <FaTicketAlt className="text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Ticket ID: {ticket.id}
                  </p>
                </div>

                {/* details */}
                <div className="p-5 flex flex-col gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-blue-500" />
                    <span>{format(ticket.date, "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{ticket.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-medium">{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seat</p>
                      <p className="font-medium">{ticket.seat}</p>
                    </div>
                  </div>
                </div>

                {/* footer */}
                <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={() => openQrModal(ticket)}
                    className="px-4 py-2 flex items-center gap-2 bg-gray-100 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition"
                  >
                    <FaQrcode /> View QR
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-xl hover:bg-blue-600 transition">
                    Download Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QR Code Modal */}
        {qrOpen && selectedTicket && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                {selectedTicket.eventTitle}
              </h2>
              <div className="flex justify-center mb-4">
                <QRCode value={selectedTicket.id} size={180} />
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Ticket ID: {selectedTicket.id}
              </p>
              <button
                onClick={closeQrModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyTicketsPage;
