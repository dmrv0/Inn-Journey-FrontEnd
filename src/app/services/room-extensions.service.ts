import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roomExtensionsModel } from '../model/Entities/ExtensionsModel/roomExtensions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomExtensionsService {
  
  url:string ="https://localhost:7171/api/RoomExtensions/";
  constructor(private http: HttpClient) { }

  getByRoomId(roomId:string):Observable<roomExtensionsModel[]>{
  return this.http.get<roomExtensionsModel[]>(this.url+roomId)
  }
  
  add(data: { roomExtensions: roomExtensionsModel[] }): Observable<any> {
  return this.http.post(this.url, data)
  }
  update(data: { roomExtensions: roomExtensionsModel[] }): Observable<any> {
    return this.http.put(this.url+ "Update", data)

    }

}
