import api from "./api";
export const fetchEvents = async () =>{
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/public/event/getAll`,{});
    return  res.data.data
}
