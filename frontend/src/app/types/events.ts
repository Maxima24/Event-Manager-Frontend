export interface Event {
  id: string
  title: string
  date: string  // ISO string, e.g. "2025-09-03"
  location: string
  description?: string
}
