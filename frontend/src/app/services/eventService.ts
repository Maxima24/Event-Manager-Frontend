import api from "./api";
export const fetchEvents = async (page:number,limit:number,search?:string) =>{
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/events?page=${page}&limit=${limit}`);

    return  res.data.data.events
}
