"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { EventType } from "../types/events"; // ✅ your renamed type
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

interface EventContextType {
  events: EventType[] | undefined;
  isLoading: boolean;
  addEvent: (event: EventType) => void;
  updateEvent: (event: EventType) => void;
  deleteEvent: (eventId: string) => void;
  getEvent: (eventId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // Fetch events
  const { data: events, isLoading } = useQuery<EventType[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get("/api/events");
      return res.data;
    },
  });

  // Add event
  const addEventMutation = useMutation({
    mutationFn: async (newEvent: EventType) => {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        newEvent
      );
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
        `${process.env.NEXT_PUBLIC_API_URL}/events/${updatedEvent.id}`,
        updatedEvent
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // Get particular event
  const getEventByIdMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`
      );
      return res.data as EventType;
    },
  });

  // Delete event
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return (
    <EventContext.Provider
      value={{
        events,
        isLoading,
        addEvent: (event) => addEventMutation.mutate(event),
        updateEvent: (event) => updateEventMutation.mutate(event),
        deleteEvent: (eventId) => deleteEventMutation.mutate(eventId),
        getEvent: (eventId) => getEventByIdMutation.mutate(eventId),
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook to use the context
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventsProvider");
  }
  return context;
};
