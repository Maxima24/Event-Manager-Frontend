"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { EventType } from "../types/events"; // ✅ your renamed type
import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import api from "../services/api";
import {fetchEvents} from "../services/eventService"
import formatDate from "../utils/formatDate";

interface EventContextType {
  events: EventType[] | undefined;
  isLoading: boolean;
  error: any;
  addEvent: (event: EventType) =>void;
  updateEvent: (event: EventType) => void;
  deleteEvent: (eventId: string) => void;
  eventData:any | undefined,
  // getEvent: (eventId: string) => void;
  setPage: (page:number)=>void;
  getUserEvent: (userId: string) => Promise<EventType[]>;
  userEvents:EventType[] | undefined,
  getEventForEdit:(id:string) => Promise<EventType>

  page:number;
  limit:number;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [userEvents,setUserEvents] = React.useState<EventType[] | undefined>([])
  const queryClient = useQueryClient();
  const[page,setPage]=React.useState(1)
  const [eventData,setEventData] = React.useState<object | undefined>(undefined)
  const limit =10

  // Fetch events
  const { data: events, isLoading,error } = useQuery<EventType[]>({
    queryKey: ["events"],
    queryFn: ()=>fetchEvents(),
    placeholderData:(prev) => prev
    })
  // Add event
  const addEventMutation = useMutation({
    mutationFn: async (newEvent: EventType) => {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events`,
       { ...newEvent,date:formatDate(newEvent.date)}
      );
      const event = res.data.data ?? res.data
      console.log(event)
        setEventData(event)
      console.log(eventData)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
  // Update event
  const updateEventMutation = useMutation({
    mutationFn: async (updatedEvent: EventType) => {
      const res = await api.put(
        `${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events/${updatedEvent.id}`,
        updatedEvent
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // Get particular event
  // const getEventByIdMutation = useMutation({
  //   mutationFn: async (eventId: string) => {
  //     const res = await api.get(
  //       `${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events/${eventId}`
  //     );
  //     return res.data as EventType;
  //   },
  // });

  // Delete event
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events/${eventId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
  const getUserEvent =  async (userId: string) =>
  {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events`,
          { params: { page: 1, limit: 10, } } // <-- pass userId properly
        );

        return res.data.data.data as EventType[]
  
  };
  const getEventForEdit = async(id:string) =>{
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events?id=${id}`,// <-- pass userId properly
    );
    console.log("apple")
    console.log(res)
    return res.data.data as EventType
  }

  
  return (
    <EventContext.Provider
      value={{
        error,
        events,
        isLoading,
        addEvent: (event) => addEventMutation.mutate(event),
        updateEvent: (event) => updateEventMutation.mutate(event),
        deleteEvent: (eventId) => deleteEventMutation.mutate(eventId),
        eventData,
        // getEvent: (eventId) => getEventByIdMutation.mutate(eventId),
       getUserEvent,
       getEventForEdit,
        userEvents,
        setPage,
        page,
        limit
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook to use the context
