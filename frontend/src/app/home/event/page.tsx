"use client";
import React from "react";
import { useEventContext } from "@/app/hooks/eventContext";
import { UserNavigation } from "@/app/components/userNavigation";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { format } from "date-fns";

function Page() {
  const { events,isLoading,error } = useEventContext();
  console.log(events);

  if(isLoading) return <div>Loading Available Events ....</div>
  if(error) return <div className="text-red-500 text-center mt-10">Error loading events: {error.message}</div>
  if(!events || Object.keys(events).length === 0) return <div className="text-gray-500 text-center mt-10">No events available.</div>
  return (
    <>
      <UserNavigation />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Available Events</h1>

        {events?.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            <p>No events created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all"
              >
                {/* preview area */}
                <div className="h-40 w-full rounded-t-2xl bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Event Image/Preview</span>
                </div>

                {/* content */}
                <div className="p-4">
                  <h2 className="text-xl font-bold truncate">{event.title}</h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {event.description || "No description provided"}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                    <FaCalendar className="text-blue-500" />
                    <span>
                      {event.date
                        ? format(new Date(event.date), "PPP")
                        : "No date"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{event.location || "No location"}</span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm hover:bg-blue-600">
                      View Details
                    </button>
                    <button className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
