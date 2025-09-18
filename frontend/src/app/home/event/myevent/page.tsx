"use client";
import React from "react";
import { useEventContext } from "@/app/hooks/useEvent";
import { UserNavigation } from "@/app/components/userNavigation";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { format } from "date-fns";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { EventType } from "@/app/types/events";
import { useAuth } from "@/app/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
 function Page() {
  const router = useRouter();
  const { user } = useAuth();
  const { getUserEvent } = useEventContext();
  const [mounted, setMounted] = React.useState(false);
const{data:userEvents,isLoading,error} = useQuery<EventType[]>({
  queryKey:['userEvents',user?.id],
  queryFn: async() =>{
    const res = await getUserEvent(String(user?.id))
    console.log(res)
    return res
  },
  enabled:!!user?.id

})

  React.useEffect(() => {
    setMounted(true);
    getUserEvent(String(user?.id))
   
  }, [user?.id]);

  if (!mounted) return null;
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading Your Events...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-medium">
          Error loading events: {error.message}
        </p>
      </div>
    );

  if (!userEvents || userEvents.length === 0)
    return (
      <>
        <UserNavigation />
        <div className="h-screen flex items-center justify-center p-6">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-semibold mb-2">You have no Events</h2>
            <p className="text-gray-500 mb-6">Please Create an Event</p>
            <button
              onClick={() => router.push("/home/createevent")}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold"
            >
              Create events
            </button>
          </div>
        </div>
      </>
    );
   
  return (
    <>
      <UserNavigation />

      {/* Header */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            🎉 My Events
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Events created by {user?.firstName}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  fill
                  alt="Event image"
                  src={event.images?.[0] || "/placeholder.png"}
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {event.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {event.description || "No description provided"}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                  <FaCalendar className="text-blue-500" />
                  <span>
                    {event.date
                      ? format(new Date(event.date), "PPP")
                      : "No date"}
                  </span>
                </div>

                {/* Location */}
                {/* <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event.venue || "No location"}</span>
                </div> */}

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium shadow hover:opacity-90 hover:scale-105 transition" onClick= {
                  ()=> router.push(`/home/event/${event.id}`)
                  }
                   >
                    View Details
                  </button>
                  <button className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 hover:scale-105 transition" onClick={
                    ()=>router.push(`/home/event/editevent/${event.id}`)
                  }>
                    Edit Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
