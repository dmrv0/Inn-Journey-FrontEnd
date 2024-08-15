import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModal } from '../model/Entities/userModal';
import { User } from '../model/user';
import { reservationModel } from '../model/Entities/reservation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string= "https://localhost:7171/api/Users";
  constructor(private http:HttpClient) { }

  responseModel :{
    success:boolean,
    message:string

  }

  getByIdUser(id:string){
    return this.http.get<userModal>(this.url+"/ById/"+id)
   }

   get():Observable<userModal[]>
   {
    return this.http.get<userModal[]>(this.url)
   }

   updateUser(user:userModal){
    return this.http.put(this.url, user)
   }

   createUser(user:userModal){
    return this.http.post<reservationModel>(this.url,user)
   }
   getByIdsUser(userIds:string[]){
    return this.http.post<any>(this.url + "/GetByIds/", {userIds})
   }


 
}
