import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { reviewModel } from '../model/Entities/review';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }
  
get(): Observable<reviewModel[]>
{
  return this.http.get<reviewModel[]>(this.url+"/Reviews")
}

getById(id:string): Observable<reviewModel>
{
  return this.http.get<reviewModel>(this.url+"/Reviews/"+id)
}

add(hotel: reviewModel): Observable<any>
{
  return this.http.post<reviewModel>(this.url+"/Reviews", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Reviews/"+id)
}
update(hotel: reviewModel): Observable<any>
{
 return this.http.put(this.url+"/Reviews/",hotel)
}
getbyIdHotel(hotelId:string, page:number, size:number):Observable<any>{
  return this.http.get<any>(this.url+"/Reviews/comments" ,{
    params:{
      hotelId:hotelId,
      page:page,
      size:size 
    }
  })
}
getByUserId(userId:string, page:number, size:number){
return this.http.get<any>(this.url+ "/Reviews/user/comments", {
  params: {
    userId:userId,
    page:page,
    size:size
  }
})
}

}
