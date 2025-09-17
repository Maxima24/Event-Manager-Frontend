import { useTicketContext } from "../hooks/useTicktets";
import api from "./api";


export const createOrder = async (order:object) => {
    // const {createTicket} = useTicketContext()

    const res  = await api.post(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/orders`,order)
    console.log(res.data.data)
    const orderDetails = res.data.data.order
    console.log(orderDetails)
     const ticketDetails = {
        user:orderDetails.user
        , event:orderDetails.event, order:orderDetails.id, ticketType:orderDetails.ticketType, price:orderDetails.totalPrice, purchaseDate:orderDetails.createdAt,count:orderDetails.numberOfTicket
    }


    console.log(orderDetails)
    console.log("here is the ticket details",ticketDetails)
    // createTicket()
    return  {
        data:res.data.data,
        ticketDetails
    } 
}

export const getOrder = async (id:string) => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/orders`,
        {
            params:id
        }
    )
    return res.data.data
}