import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { roomTypeModel } from '../model/Entities/room-type';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }
  
get(): Observable<roomTypeModel[]>
{
  return this.http.get<roomTypeModel[]>(this.url+"/RoomTypes")
}

getById(id:string): Observable<roomTypeModel>
{
  return this.http.get<roomTypeModel>(this.url+"/RoomTypes/"+id)
}

add(hotel: roomTypeModel): Observable<any>
{
  return this.http.post<roomTypeModel>(this.url+"/RoomTypes", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/RoomTypes/"+id)
}
update(hotel: roomTypeModel): Observable<any>
{
 return this.http.put(this.url+"/RoomTypes/",hotel)
}


}
