export enum TicketOrderStatus  {
    COMPLETED= 'completed',
    PENDING= 'pending',
    EXPIRED= 'expired',
    FAILED= 'failed',
    CANCELLED= 'cancelled',
    PAID_FAILED_TICKETING= 'paid-failed-ticketing',
    PAID_FAILED_EMAIL= 'paid-failed-email',
}
export interface TIcketType{
    name: string;
    description:string;
    price: number;
}