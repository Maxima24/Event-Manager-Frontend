import { TIcketType } from "./tickets"

export interface EventType {
  id?: string
  title: string
  date?: Date,// ISO string, e.g. "2025-09-03"
  venue: string
  description?: string
  images?: string[] // array of image URLs
  user:string
  category:string
  ticketTypes:TIcketType[]
  publicationStatus:"published"
}
