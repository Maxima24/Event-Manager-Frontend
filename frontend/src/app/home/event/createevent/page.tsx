"use client";
import { UserNavigation } from "@/app/components/userNavigation";
import React from "react";
import { FaLandmark, FaCalendar, FaDownload } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEventContext } from "@/app/hooks/eventContext";
import { EventType } from "@/app/types/events";
import { useAuth } from "@/app/hooks/userContext";

type TicketUI = {
  category: string;
  price: number;
  quantity: number;
  available: boolean;
};

function Page() {
  const { user } = useAuth();
  if(!user) return <div className="text-red-500 text-center mt-10">You need to be logged in to create an event</div>
  const { addEvent } = useEventContext();
  const [images, setImages] = React.useState<Array<File>>([]);
  const [previewImages, setPreviewImages] = React.useState<Array<string>>([]);

  const [eventDetails, setEventDetails] = React.useState<EventType>({
    title: "",
    date: null,
    venue: "",
    description: "",
    user:{}
  });

  const [tickets, setTickets] = React.useState<TicketUI[]>([
    { category: "Regular", price: 0, quantity: 0, available: true },
    { category: "VIP", price: 0, quantity: 0, available: true },
    { category: "VVIP", price: 0, quantity: 0, available: true },
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

  // ✅ Image upload + multiple selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);

    setImages((prev) => [...prev, ...filesArray]);

    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  // ✅ Cleanup URLs to prevent memory leaks
  React.useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  // ✅ Handle event creation
  const handleEventCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Event Details before submission:", eventDetails);
    setEventDetails({...eventDetails,user})
    if (!eventDetails.title || !eventDetails.date || !eventDetails.venue) {
      console.log("Please fill all the available fields");
      return;
    }

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });


      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Server response:", data);

      addEvent({ ...eventDetails, images: data.urls });

      console.log("Event created:", {
        ...eventDetails,
        images: data.urls,
        tickets,
      });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };


  return (
    <>
      <UserNavigation />
      <form onSubmit={handleEventCreation}>
        <div className="grid grid-cols-2 ml-3">
          {/* LEFT SIDE */}
          <div>
            {/* Image Upload */}
            <section className="w-full mt-10 p-3 py-6 bg-gray-100 text-center border-2 rounded-2xl flex justify-center items-center">
              <div className="p-3 w-64 h-24 rounded-2xl border-2 flex justify-center items-center flex-col gap-1">
                <FaDownload size={16} />
                <label className="text-sm font-semibold cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="hidden"
                  />
                  Upload Images
                </label>
              </div>
            </section>

            {/* PREVIEW */}
            <section className="w-full border-1 border-gray-200 mt-6">
              <div className="inline-grid grid-flow-col">
                {previewImages.map((src, i) => (
                  <div
                    key={i}
                    className="border-2 flex justify-center items-center w-32 h-32"
                  >
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Overview */}
            <section className="mt-6 border-2 border-gray-200 rounded-2xl w-full h-auto">
              <div className="ml-2 mt-1 font-bold pt-6">
                <span className="text-2xl">Overview</span>
              </div>

              <div className="flex flex-col gap-2 ml-3 my-4">
                <div className="flex gap-2 items-center my-2 mx-2">
                  <label>Name</label>
                  <input
                    type="text"
                    value={eventDetails.title}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        title: e.target.value,
                      })
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
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <section className="w-full p-4 h-fit text-left">
            <div className="grid grid-cols-2 gap-2">
              {/* Date */}
              <div className="border flex flex-col gap-3 bg-gray-300 mt-6 rounded-2xl p-4">
                <span className="font-semibold text-xs">Select date</span>
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
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Location */}
              <div className="border flex flex-col bg-gray-300 mt-6 rounded-2xl p-4">
                <span className="font-semibold text-xs">Select location</span>
                <input
                  type="text"
                  placeholder="Enter a location"
                  value={eventDetails.venue}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, venue: e.target.value })
                  }
                  className="w-64 border border-gray-200 bg-white rounded-md px-3 py-1 mt-3"
                />
              </div>
            </div>

            {/* Tickets */}
            <div className="w-full border border-green-100 rounded-2xl mt-10 p-4 bg-gray-200">
              <h3 className="font-bold">Tickets</h3>
              <div className="flex flex-col gap-3 mt-2">
                {tickets.map((t, i) => (
                  <div
                    key={t.category}
                    className="grid grid-cols-12 items-center gap-3 bg-white rounded-xl p-3"
                  >
                    <div className="col-span-3 font-bold">{t.category}</div>
                    <div className="col-span-3">
                      <label className="block text-xs">Price</label>
                      <input
                        className="p-2 w-full border rounded-md"
                        type="number"
                        min={0}
                        value={t.price}
                        onChange={(e) =>
                          updateTicketField(i, "price", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs">Quantity</label>
                      <input
                        className="p-2 w-full border rounded-md"
                        type="number"
                        min={0}
                        value={t.quantity}
                        onChange={(e) =>
                          updateTicketField(i, "quantity", Number(e.target.value))
                        }
                      />
                    </div>
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
            </div>
          </section>
        </div>

        {/* ✅ General Submit Button */}
        <div className="flex justify-center mt-6">
          <Button type="submit" className="px-6 py-2">
            Create Event
          </Button>
        </div>
      </form>
    </>
  );
}

export default Page;
