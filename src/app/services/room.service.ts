import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roomModel } from '../model/Entities/room';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }
  
get(): Observable<roomModel[]>
{
  return this.http.get<roomModel[]>(this.url+"/Rooms")
}

getById(id:string): Observable<roomModel>
{
  return this.http.get<roomModel>(this.url+"/Rooms/"+id)
}

add(hotel: roomModel): Observable<any>
{
  return this.http.post<roomModel>(this.url+"/Rooms", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Rooms/"+id)
}
update(hotel: roomModel): Observable<any>
{
 return this.http.put(this.url+"/Rooms/",hotel)
}
getRoomByHotelId(id:String):Observable<roomModel[]>{
  return this.http.get<roomModel[]>(this.url+"/Rooms/hotel/"+id)
}
}

