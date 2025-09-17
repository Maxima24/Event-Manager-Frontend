import React  from 'react'
import { TicketContext } from '../contexts/ticketContext'
export const useTicketContext = () =>{
    const context = React.useContext(TicketContext)
    if(!context){
        throw new Error("useTicket Contect cannot be used outside of TicketProvider")
    }
    return context
}