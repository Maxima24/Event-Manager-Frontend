import api from "./api";
import { OrderType } from "../types/order";
import { TIcketType } from "../types/tickets";

interface TicketType{
    event: string
    user: string
    ticketType?:object;
    price: number;
    seatNumber?: string;
    order: string;
    qrCode: string;
    isUsed?: boolean;
    purchaseDate: Date;
}
 export interface createTicketType{
    user: string,
    event: string,
    order: string,
    ticketType: TIcketType | null,
    price: number,
    purchaseDate: Date,
    count: number
}

export const createTickets = async(data:createTicketType) =>{
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/create-ticket`,{
        ...data
    })
    console.log(res.data)
    return res.data
}
export const fetchTickets = async () => {
    const res =  await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets`)
    return res.data     
}
export const getTicketById = async(ticketId:string) =>{
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/${ticketId}`,
        {params:ticketId}
    )
}
export const veriifyTicket = async(ticketCode:string) =>{
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/verify`,{
        ticketCode
    })
}
export const resendTicketEmail = async(id:string) =>{
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/${id}/resend-email`,{
        id
    })
}
export const downloadTIcket = async(id:string) =>{
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/${id}/download`,{
        params:id
    })
}
export const cancelTicket = async(ticketCode:string) =>{
    const res = await api.patch(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/tickets/cancel`,{
        ticketCode
    })
}