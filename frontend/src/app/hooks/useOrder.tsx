import { useContext } from "react";
import { OrderContext } from "../contexts/orderContext";

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
      throw new Error("useEventContext must be used within an EventsProvider");
    }
    return context;
  };
  