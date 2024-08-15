import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelModal } from '../model/Entities/hotelmodal';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }




  getHotels( maxStar?: boolean, page: number = 0, size: number = 5, maxPrice?:boolean): Observable<HotelModal[]> {
      if ((maxStar == undefined || maxStar == null) && (maxPrice == null || maxPrice == undefined)) {
        // maxStar değeri belirtilmemişse, parametre göndermeden veri al
        return this.http.get<HotelModal[]>(`${this.url}/Hotels`, {
          params: {
            page: page,
            size: size,
          } 
        });
    } else if(maxStar != undefined || maxStar != null){
        // maxStar değeri belirtilmişse, parametre ile veri al
        return this.http.get<HotelModal[]>(`${this.url}/Hotels`, {
            params: {
              page: page,
              size: size,
              maxStar: maxStar
            }
        });}

        else if(maxPrice != null)
          {

            return this.http.get<HotelModal[]>(`${this.url}/Hotels`, {
              params: {
                page: page,
                size: size,
                maxPrice: maxPrice
              }
          });
          } 

          else {

            return this.http.get<HotelModal[]>(`${this.url}/Hotels`, {
              params: {
                page: page,
                size: size,
                maxPrice: maxPrice
              }
          });

          }

  }
  getHotelsDate(checkIn:Date, checkOut:Date, page: number = 0, size: number = 5): Observable<any> {
 
    const checkInString = checkIn.toISOString();
    const checkOutString = checkOut.toISOString();

    // HttpParams ile tarih ve diğer parametreleri ayarla
    const params = new HttpParams()
      .set('checkIn', checkInString)
      .set('checkOut', checkOutString)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.url}/Hotels/AvaibleHotels`, { params });
  }
  
getHotelById(id:string): Observable<HotelModal>
{
  return this.http.get<HotelModal>(this.url+"/Hotels/"+id)
}

addHotel(hotel: HotelModal): Observable<any>
{
  return this.http.post<HotelModal>(this.url+"/Hotels", hotel)
}
deleteHotel(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Hotels/"+id)
}
updateHotel(hotel: HotelModal): Observable<any>
{
 return this.http.put(this.url+"/Hotels/",hotel)
}

getMyHotels(userId:string): Observable<HotelModal[]>
{
  return this.http.get<HotelModal[]>(this.url+"/Hotels/myHotels/"+ userId)
}

getHotelsName(hotelIds:string[]){
return this.http.post<any>(this.url+"/Hotels/GetHotelName", {hotelIds})
}



}
