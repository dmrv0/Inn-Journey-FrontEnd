import { Injectable } from '@angular/core';
import { hotelExtensionsModel } from '../model/Entities/ExtensionsModel/hotelExtensions';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelExtensionsService {
  url:string ="https://localhost:7171/api/HotelExtensions/";
  constructor(private http: HttpClient) { }

  getByHotelId(hotelId:string):Observable<hotelExtensionsModel[]>{
  return this.http.get<hotelExtensionsModel[]>(this.url+hotelId)
  }
  
  add(data: { hotelExtensions: hotelExtensionsModel[] }): Observable<any> {
  return this.http.post(this.url, data)
  }
  update(data: { hotelExtensions: hotelExtensionsModel[] }): Observable<any> {
    return this.http.put(this.url+ "Update", data)
    }

  
}
