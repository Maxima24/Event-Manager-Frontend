import React, {createContext,ReactNode, useContext} from 'react'
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import { createTickets, createTicketType } from '../services/ticketService'
import { useAuth } from '../hooks/useAuth'

interface TicketContextType{
    tickets:[]
    isLoading:boolean,
    createTicket:(data:createTicketType)=>void

}
 export const TicketContext  = React.createContext<TicketContextType | undefined>(undefined)
export const TicketProvider = ({children}:{children:ReactNode})  =>{
    const querClient = useQueryClient()
    const {isAuthenticated} = useAuth()
   
    const createTicketMutation = useMutation({
        mutationFn:(data:createTicketType)=>createTickets(data),
        onSuccess:()=>{querClient.invalidateQueries({queryKey:['tickets']})
    }})
    const {data:tickets,isLoading} = useQuery({
        queryKey:["tickets"],
        queryFn: async ()=>{
            const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets`)
            return res.data.data
        }
        ,enabled: !!isAuthenticated
    })
    return (
        <TicketContext.Provider
          value={{
            tickets,
            isLoading,
            createTicket:(data) => createTicketMutation.mutateAsync(data)
          }}
        >
          {children}
        </TicketContext.Provider>
      );
}

