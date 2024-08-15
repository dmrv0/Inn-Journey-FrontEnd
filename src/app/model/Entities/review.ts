export interface reviewModel{
    id: string,
    hotelId: string,
    userId: string,
    rating: number,
    comment: string,
    createdDate?: Date,
}