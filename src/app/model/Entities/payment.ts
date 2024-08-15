export interface PaymentModel{
    id: string,
    hotelId:string,
    userId:string,
    reservationId: string
    amount: number,
    status: string
    paymentMethod: string
    date: Date
}