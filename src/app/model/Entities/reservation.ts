export interface reservationModel{
    id: string,
    userId : string,
    hotelId: string,
    roomId : string,
    checkIn : Date,
    checkOut: Date,
    totalPrice: number,
    status: string,
    deleted?:boolean
    totalCount?: number,
}