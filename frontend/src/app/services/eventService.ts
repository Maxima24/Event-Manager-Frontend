import api from "./api";
export const fetchEvents = async () =>{
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/public/event/getAllEvents`);
    return  res.data.response
}
