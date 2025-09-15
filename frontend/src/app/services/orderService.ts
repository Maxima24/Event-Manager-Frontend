import api from "./api";

export const createOrder = async () => {
    const res  = await api.post(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/orders`)
    return res.data.data
}

export const getOrder = async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL_PROTECTED}/orders`)
    return res.data.data
}