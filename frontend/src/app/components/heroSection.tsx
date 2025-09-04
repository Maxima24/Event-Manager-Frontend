"use client";
import React from "react";
import QuickSearchComponent from "./quickSearch";
import { universityCollection } from "../utils/unvirsityUploader";
import Image from "next/image";
const Event = [
    {
        "eventName":"OU live cort",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",eventTIme:"free",eventAvailablity:"Free"
        
    },
    {
        "eventName":"OAU live cocer",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",
eventTIme:"free",eventAvailablity:"Free"    },
    {
        "eventName":"OAU l concrt",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",
eventTIme:"free",eventAvailablity:"Free"    },
    {
        "eventName":"OAU ive ccert",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",
eventTIme:"none",eventAvailablity:"Free"    },
    {
        "eventName":"OAU lert",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",
eventTIme:"none",eventAvailablity:"Free"    },
    {
        "eventName":"OAU ve cot",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",
eventTIme:"none",eventAvailablity:"Free"    },
    {
        "eventName":"OUe concert",
        "eventImage":"https://www.dreamstime.com/beautiful-summer-spring-meadow-blue-flowers-forget-me-nots-two-flying-butterflies-wild-nature-landscape-beautiful-image182636005",
eventTIme:"none",eventAvailablity:"Free"    }

]


export function HeroSection() {
  const universities = universityCollection();
  return (
    <div className="mt-10 ">
      <section>
        <div className='w-auto h-[420.83px] bg-[url("/mockup.jpg")] bg-cover '>
          hi
        </div>
      </section>
      <section className="flex justify-center items-center">
        <QuickSearchComponent />
      </section>
      {/* Browse Events section */}
      <section className="border-t-2 border-b-2 border-gray-200/50 mt-2 flex items-center p-2">
        <div className="flex gap-5 items-center mt-5 justify-center">
          <h2 className="ml-3 ">Browse Events in</h2>
          <div className="flex items-center justify-center">
            <div>
              <form>
                <select name="event_place" id="">
                  {universities.map((university) => {
                    return <option key={university}>{university}</option>;
                  })}
                </select>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/*view events */}
      <h3 className="my-2 mx-2 font-bold text-3xl">Events in</h3>
      <section className="flex flex-col">
        <div className="grid grid-cols-4 w-full ">
          {  Event.map((event)=>{
            const name = event.eventName
            // const image = event.eventImage
            const time = event.eventTIme
            const availablity = event.eventAvailablity
            return (
                <div key={name} className="w-auto  mx-3 mb-4 p-3">
                  <div className=" flex justify-center items-center w-32xl h-48 border-t-2 rounded-2xl text-center ">
                        No image yet
                  </div>
                  <div className="flex flex-col font-semibold text-2xl">
                    <span>{name}</span>
                    <span className="font-semibold text-2xs">{time}</span>
                     <span className="font-semibold text-xs">{availablity}</span>                 
                  </div>


                </div>
            )

          })}
        </div>
      </section>
    </div>
  );
}
