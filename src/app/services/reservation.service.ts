import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservationModel } from '../model/Entities/reservation';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }


get(): Observable<reservationModel[]>
{
  return this.http.get<reservationModel[]>(this.url+"/Reservations")
}

getById(id:string): Observable<reservationModel>
{
  return this.http.get<reservationModel>(this.url+"/Reservations/"+id)
}

add(hotel: reservationModel): Observable<any>
{
  return this.http.post<reservationModel>(this.url+"/Reservations", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Reservations/"+id)
}
update(hotel: reservationModel): Observable<any>
{
 return this.http.put(this.url+"/Reservations/",hotel)
}

getByHotelRezervation(hotelId:string, page:number, size:number){
return this.http.get<any>(this.url+"/Reservations/hotel/" ,{
  params:{
    hotelId:hotelId,
    page:page,
    size:size
  }
})
}
getReservationByUserId(userId:string, page: number = 0, size: number = 5, ):Observable<reservationModel[]>{
return this.http.get<reservationModel[]>(this.url+"/Reservations/user", {
  params:{
    userId:userId,
    page:page,
    size:size
  }
} )
}
getReservationByRoomId(roomId:string):Observable<reservationModel[]>{
  return this.http.get<reservationModel[]>(this.url+"/Reservations/room/"+roomId)
  }

}
