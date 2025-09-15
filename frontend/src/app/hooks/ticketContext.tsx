import React, {createContext,ReactNode, useContext} from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '../services/api'

interface TicketContextType{
    tickets:[]
    isLoading:boolean

}
const TicketContext  = React.createContext<TicketContextType | undefined>(undefined)
export const TicketProvider = ({children}:{children:ReactNode})  =>{
    const {data:tickets,isLoading} = useQuery({
        queryKey:["tickets"],
        queryFn: async ()=>{
            const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets`)
            return res.data.data
        }
    })
    const createTicketMutation = useMutation({
        mutationFn: async()=>{
            const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/`)
        }
    })













    return (
        <TicketContext.Provider
          value={{
            tickets,
            isLoading,
          }}
        >
          {children}
        </TicketContext.Provider>
      );
}

export const useTicketContext = () =>{
    const context = React.useContext(TicketContext)
    if(!context){
        throw new Error("useTicket Contect cannot be used outside of TicketProvider")
        return context
    }
}