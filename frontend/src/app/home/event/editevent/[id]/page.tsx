"use client";
import { UserNavigation } from "@/app/components/userNavigation";
import React, { useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/hooks/useAuth";
import { useEventContext } from "@/app/hooks/useEvent";
import { EventType } from "@/app/types/events";
import { useQuery } from "@tanstack/react-query";

type TicketUI = {
  category: string;
  price: number;
  quantity: number;
  available: boolean;
};
interface Props{
   params:Promise<{id:string}>
}
function Page({params}:Props) {
  const { user } = useAuth();
  const { getUserEvent,addEvent } = useEventContext();
   const {id} =React.use(params)
   const safeValue = (val: any) => (val !== undefined && val !== null ? String(val) : "");

   
// const {data:event,isLoading,error,} = useQuery({
//     queryKey:["editableEvent",id],
//     queryFn:async () =>{
//         const response = await getEventForEdit(id)
//         console.log(response)

//         return response
//     },
//     enabled:!!id,
// })
const{data:events,isLoading,error} = useQuery<EventType[]>({
    queryKey:['userEvents',user?.id],
    queryFn: async() =>{
      const res = await getUserEvent(String(user?.id))
      console.log(res)
      return res
    },
    enabled:!!user?.id
  
  })
  const [images, setImages] = React.useState<Array<File>>([]);
  const [previewImages, setPreviewImages] = React.useState<Array<string>>([]);

  const [eventDetails, setEventDetails] = React.useState<EventType>({
    title: "",
    venue: "",
    description: "",
    user: "",
  });

  const [tickets, setTickets] = React.useState<TicketUI[]>([
    { category: "Regular", price: 0, quantity: 0, available: true },
    { category: "VIP", price: 0, quantity: 0, available: true },
    { category: "VVIP", price: 0, quantity: 0, available: true },
  ]);





  useEffect(()=>{
        setEventDetails({
            title: safeValue(event?.title),
            venue: safeValue(event?.venue),
            description: safeValue(event?.description),
            user: safeValue(event?.user)
        })
  },[])
const event = React.useMemo(() => {
    if (!events || !id) return null;
    return events.find((e: any) => String(e.id) === String(id)) ?? null;
  }, [events, id]); // 9


 
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    setImages((prev) => [...prev, ...filesArray]);

    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  React.useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleEventCreation = async (e: React.FormEvent) => {
    e.preventDefault();
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
      addEvent({ ...eventDetails, user: user?.id, images: data.urls });

      console.log("Event created:", {
        ...eventDetails,
        images: data.urls,
        tickets,
      });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };
  if (!user)
    return (
      <div className="text-red-500 text-center mt-10">
        You need to be logged in to create an event
      </div>
    );

  return (
    <>
      <UserNavigation />
      <form onSubmit={handleEventCreation}>
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6 rounded-2xl p-5 shadow-md bg-white h-[80vh] overflow-y-auto">
            {/* Upload */}
            <section className="w-full p-6 text-center rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-3 hover:bg-pink-50 transition">
              <FaDownload size={20} className="text-pink-600" />
              <label className="cursor-pointer font-medium text-pink-700 hover:underline">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  className="hidden"
                />
                Upload Images
              </label>
            </section>

            {/* Preview */}
            {previewImages.length > 0 && (
              <section className="w-full">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 
                                max-h-40 overflow-y-auto p-2 rounded-xl bg-gray-50">
                  {previewImages.map((src, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl overflow-hidden w-28 h-28 flex items-center justify-center shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Preview ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Overview */}
            <section className="rounded-xl w-full bg-gray-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Overview
              </h3>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Event name"
                  value={eventDetails.title}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, title: e.target.value })
                  }
                  className="px-4 py-2 rounded-xl w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <textarea
                  placeholder="Event description"
                  value={eventDetails.description}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      description: e.target.value,
                    })
                  }
                  className="px-4 py-2 rounded-xl w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  rows={3}
                />
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <section className="flex flex-col gap-6 rounded-2xl p-5 shadow-md bg-white h-[80vh] overflow-y-auto">
            {/* Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 shadow-sm">
                <span className="font-medium text-sm text-gray-700">
                  Select date
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[240px] justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-pink-600" />
                      Pick a date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 shadow-lg">
                    <Calendar
                      mode="single"
                      selected={undefined}
                      onSelect={(date) => console.log(date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 shadow-sm">
                <span className="font-medium text-sm text-gray-700">
                  Location
                </span>
                <input
                  type="text"
                  placeholder="Enter a location"
                  value={eventDetails.venue}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, venue: e.target.value })
                  }
                  className="w-full rounded-md px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            {/* Tickets */}
            <div className="w-full rounded-xl p-5 bg-gray-50 shadow-sm">
              <h3 className="font-semibold text-gray-700">Tickets</h3>
              <div className="flex flex-col gap-4 mt-3">
                {tickets.map((t, i) => (
                  <div
                    key={t.category}
                    className="grid grid-cols-12 items-center gap-3 bg-white rounded-xl p-3 shadow-sm"
                  >
                    <div className="col-span-3 font-semibold text-gray-700">
                      {t.category}
                    </div>
                    <div className="col-span-3">
                      <input
                        className="p-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                        type="number"
                        min={0}
                        placeholder="Price"
                        value={t.price}
                        onChange={(e) =>
                          updateTicketField(i, "price", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        className="p-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                        type="number"
                        min={0}
                        placeholder="Qty"
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
                      <label
                        htmlFor={`available-${i}`}
                        className="text-sm text-gray-700"
                      >
                        Available
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-1">
          <Button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 hover:opacity-90 text-white font-semibold rounded-xl shadow-md"
          >
            Create Event
          </Button>
        </div>
      </form>
    </>
  );
}

export default Page;
