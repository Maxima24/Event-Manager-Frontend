import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode } from "react";
import { createOrder, getOrder } from "../services/orderService";
import { createTickets } from "../services/ticketService";

interface Order {
  event: string;
  ticketType:string ;
  numberOfTicket: number;
}

interface OrderContextType {
  isLoading: boolean;
  createOrder: (orderData:Order) => Promise<any>

  getOrderById: (id: string) => ReturnType<typeof useQuery>; // hook return
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // --- Mutation for creating order ---
  const createOrderMutation = useMutation({
    mutationFn: async (order: Order) => createOrder(order),
    onSuccess: (datam) => {
        const{data,ticketDetails} = datam
        
      // Invalidate "orders" cache so queries refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // --- Wrap getOrder in a hook ---
  const getOrderById = (id: string) =>
    useQuery({
      queryKey: ["orders", id],
      queryFn: () => getOrder(id),
      enabled: !!id,
    });

  return (
    <OrderContext.Provider
      value={{
        isLoading: createOrderMutation.isPending,
        createOrder: async(order: Order) =>{
            console.log(order)
            const ticketDetails = await createOrderMutation.mutateAsync(order)
            return ticketDetails
        },
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};