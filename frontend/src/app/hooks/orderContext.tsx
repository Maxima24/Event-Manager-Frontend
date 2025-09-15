import { useQuery } from "@tanstack/react-query"
import React,{createContext,useContext,ReactNode} from "react"
// import { OrderType } from "../types/order"
import { fetchTickets } from "../services/ticketService"

interface OrderType{
    tickets: any
    isLoading:boolean
}


const OrderContext = createContext<OrderType | undefined>(undefined)

export const OrderProvider =  ({children}:{children:ReactNode}) =>{
    const {data:tickets,isLoading,} = useQuery({
        queryKey:["tickets"],
        queryFn:fetchTickets
    })
     
    




    return <OrderContext.Provider
    value={{
        tickets,
        isLoading

    }
      
    }>



    </OrderContext.Provider>
}