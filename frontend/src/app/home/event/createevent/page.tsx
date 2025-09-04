"use client";
import { UserNavigation } from "@/app/components/userNavigation";
import React from "react";
import { FaLandmark, FaCalendar, FaDownload } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEventContext } from "@/app/context/eventContext";
import { EventType } from "@/app/types/events";

type TicketUI = {
  category: string;
  price: number;
  quantity: number;
  available: boolean;
};

function Page() {
  const { addEvent } = useEventContext();

  const [eventDetails, setEventDetails] = React.useState<EventType>({
    title: "",
    date: null,            // Date | null (kept as you had it)
    location: "",
    description: "",
  });

  // ✅ ticket UI state (does not affect your submit logic)
  const [tickets, setTickets] = React.useState<TicketUI[]>([
    { category: "Regular", price: 0, quantity: 0, available: true },
    { category: "VIP",     price: 0, quantity: 0, available: true },
    { category: "VVIP",    price: 0, quantity: 0, available: true },
  ]);

  const updateTicketField = <K extends keyof TicketUI>(
    index: number,
    key: K,
    value: TicketUI[K]
  ) => {
    setTickets((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const handleEventCreation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventDetails.title || !eventDetails.date || !eventDetails.location) {
      console.log("Please fill all the available fields");
      return;
    }

    // 🔒 keeps your original logic intact
    addEvent(eventDetails);

    // just for visibility while developing:
    console.log("Event created:", eventDetails);
    console.log("Tickets (UI only for now):", tickets);
  };

  return (
    <>
      <UserNavigation />
      <div className="grid grid-cols-2 ml-3">
        {/* LEFT SIDE */}
        <div>
          <section className="w-full mt-10 p-3 py-6 bg-gray-100 text-center border-2 border-transparent rounded-2xl flex justify-center items-center">
            <div className="p-3 w-64 h-24 rounded-2xl border-transparent border-2 flex justify-center items-center flex-col gap-1">
              <FaDownload size={16} />
              <span>
                Upload Photos <br /> and videos
              </span>
            </div>
          </section>

          {/* PREVIEW BOXES */}
          <section className="w-full h-18 border-1 border-gray-200 mt-6 grid grid-flow-col">
            {Array(5)
              .fill("Preview")
              .map((text, i) => (
                <div
                  key={i}
                  className="border-2 border-gray-100 flex justify-center items-center w-full text-center"
                >
                  <span>{text}</span>
                </div>
              ))}
          </section>

          {/* OVERVIEW */}
          <section className="mt-6 border-2 border-gray-200 rounded-2xl w-full h-auto">
            <div className="ml-2 mt-1 font-bold pt-6">
              <span className="text-2xl"> Overview</span>
            </div>
            <form
              className="flex flex-col gap-2 ml-3 my-4"
              onSubmit={handleEventCreation}
            >
              <div className="flex gap-2 items-center my-2 mx-2">
                <label>Name</label>
                <input
                  type="text"
                  value={eventDetails.title}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, title: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-200 rounded-2xl w-full ml-5"
                />
              </div>

              <div className="flex gap-2 items-center my-2 mx-2">
                <label>Summary</label>
                <input
                  type="text"
                  value={eventDetails.description}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      description: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-200 rounded-2xl w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Create Event
              </button>
            </form>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <section className="w-full p-4 h-fit text-left">
          <div className="grid grid-cols-2 gap-2">
            {/* DATE PICKER */}
            <div className="border bg-gray-300 mt-6 rounded-2xl">
              <div className="mt-3">
                <span className="ml-6 font-semibold text-xs">Select date</span>
              </div>
              <div className="mb-2 flex justify-between items-center">
                <span className="ml-6 font-semibold text-2xl">Enter Date</span>
                <FaCalendar size={16} className="mr-4" />
              </div>
              <div className="ml-6 mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[240px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventDetails.date
                        ? format(eventDetails.date, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={eventDetails.date ?? undefined}
                      onSelect={(date) =>
                        setEventDetails({
                          ...eventDetails,
                          date: date ?? null,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* LOCATION PICKER */}
            <div className="border bg-gray-300 mt-6 rounded-2xl">
              <div className="mt-3">
                <span className="ml-6 font-semibold text-xs">Select location</span>
              </div>
              <div className="mb-2 flex justify-between items-center">
                <span className="ml-6 font-semibold text-2xl">Enter Location</span>
                <FaLandmark size={16} className="mr-4" />
              </div>
              <div className="ml-6 mb-4">
                <input
                  type="text"
                  placeholder="Enter a location"
                  value={eventDetails.location}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, location: e.target.value })
                  }
                  className="w-fit border border-gray-200 bg-white rounded-md px-3 py-1"
                />
              </div>
            </div>
          </div>

          {/* 🎟️ Tickets UI with availability & quantity */}
          <div className="w-full border border-green-100 rounded-2xl mt-10 p-4 bg-gray-200">
            <h3 className="font-bold">Tickets</h3>
            <span className="font-semibold text-2xl">Category</span>

            <div className="flex flex-col gap-3 mt-2">
              {tickets.map((t, i) => (
                <div
                  key={t.category}
                  className="grid grid-cols-12 items-center gap-3 bg-white rounded-xl p-3"
                >
                  <div className="col-span-3 font-bold">{t.category}</div>

                  {/* price */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">Price</label>
                    <input
                      className="p-2 w-full border rounded-md"
                      type="number"
                      min={0}
                      value={t.price}
                      onChange={(e) =>
                        updateTicketField(i, "price", Number(e.target.value))
                      }
                      placeholder="0"
                    />
                  </div>

                  {/* quantity */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                    <input
                      className="p-2 w-full border rounded-md"
                      type="number"
                      min={0}
                      value={t.quantity}
                      onChange={(e) =>
                        updateTicketField(i, "quantity", Number(e.target.value))
                      }
                      placeholder="0"
                    />
                  </div>

                  {/* availability */}
                  <div className="col-span-3 flex items-center gap-2">
                    <input
                      id={`available-${i}`}
                      type="checkbox"
                      checked={t.available}
                      onChange={(e) =>
                        updateTicketField(i, "available", e.target.checked)
                      }
                    />
                    <label htmlFor={`available-${i}`} className="text-sm">
                      Available
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* (Optional) Add new ticket type — UI only */}
            {/* 
            <button
              type="button"
              className="mt-3 text-sm underline"
              onClick={() =>
                setTickets((prev) => [
                  ...prev,
                  { category: `Custom ${prev.length + 1}`, price: 0, quantity: 0, available: true },
                ])
              }
            >
              + Add ticket type
            </button>
            */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Page;
