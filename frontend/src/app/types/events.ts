export interface EventType {
  id?: string
  title: string
  date: Date | null ,// ISO string, e.g. "2025-09-03"
  location: string
  description?: string
}
