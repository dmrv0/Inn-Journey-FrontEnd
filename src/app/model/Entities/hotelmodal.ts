export interface HotelModal{
    id:string,
    name:string,
    address: string,
    phone: number,
    email: string,
    description: string,
    star: number,
    starRating: number,
    imageUrl:string,
    standartRoomPrice:number,
    googleMap:string,
    totalCount?: number,
   }