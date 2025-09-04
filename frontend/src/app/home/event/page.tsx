'use client'
import { UserNavigation } from "@/app/components/userNavigation";
import React from "react";
import { FaLandmark, FaCalendar, FaDownload } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, LocateIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [location, setLocation] = React.useState<string>("");

  return (
    <>
      <UserNavigation />
      <div className="grid grid-cols-2 ml-3">
        {/* LEFT SIDE */}
        <div>
          <section className="w-full mt-10  p-3 py-6  bg-gray-100 text-center border-2 border-transparent rounded-2xl flex justify-center items-center">
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
          <section className="mt-6  border-2 border-gray-200 rounded-2xl w-full h-auto ">
            <div className=" ml-2 mt-1 font-bold pt-6">
              <span className="text-2xl"> Overview</span>
            </div>
            <form className="flex flex-col gap-2 ml-3 my-4">
              <div className="flex gap-2 items-center  my-2 mx-2">
                <label> Name</label>
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-200 rounded-2xl w-full ml-5"
                />
              </div>

              <div className="flex gap-2 items-center  my-2 mx-2">
                <label>Summary</label>
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-200 rounded-2xl w-full"
                />
              </div>

              <div className="flex flex-col gap-2 w-full  my-2 mx-2">
                <label>Event Highlights</label>
                <div className="flex gap-2 items-center pb-6">
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-2xl w-full"
                  />
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-2xl w-full"
                  />
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-2xl w-full"
                  />
                </div>
              </div>
            </form>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <section className="w-full  p-4  h-fit text-left ">
          <div className="grid grid-cols-2  gap-2">
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
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex justify-end mr-8 gap-8 mb-4">
                <button className="border border-transparent rounded-md hover:border-gray-200 px-2 py-1">
                  cancel
                </button>
                <button className="border border-transparent rounded-md hover:border-gray-200 px-2 py-1">
                  ok
                </button>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[240px] justify-start text-left font-normal"
                    >
                      <LocateIcon className="mr-2 h-4 w-4" />
                      {location || "Pick a Location"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[240px] p-4">
                    <input
                      type="text"
                      placeholder="Enter a location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-2 py-1"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex justify-end mr-8 gap-8 mb-4">
                <button className="border border-transparent rounded-md hover:border-gray-200 px-2 py-1">
                  cancel
                </button>
                <button className="border border-transparent rounded-md hover:border-gray-200 px-2 py-1">
                  ok
                </button>
              </div>
            </div>
          </div>

          {/* TICKETS */}
          <div className="w-full border border-green-100 rounded-2xl mt-6 p-4 bg-gray-200">
            <h3 className="font-bold ">Tickets</h3>
            <span className="font-semibold text-2xl ">Category</span>
          <div className="flex gap-3">
          <div className="mt-2 flex items-center gap-2">
              <span className=" font-bold">Regular</span>
              <div className="border border-blue-200 rounded-2xl mt-1">
                <input
                  className="p-2 w-full"
                  placeholder="input price"
                  type="number"
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className=" font-bold">Vip</span>
              <div className="border border-blue-200 rounded-2xl mt-1">
                <input
                  className="p-2 w-full"
                  placeholder="input price"
                  type="number"
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className=" font-bold">VVIP</span>
              <div className="border border-blue-200 rounded-2xl mt-1">
                <input
                  className="p-2 w-full"
                  placeholder="input price"
                  type="number"
                />
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Page;
