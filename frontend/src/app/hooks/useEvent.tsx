import { EventContext } from "../contexts/eventContext";
import {useContext } from "react";
export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
      throw new Error("useEventContext must be used within an EventsProvider");
    }
    return context;
  };
  