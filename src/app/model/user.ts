import { LocalStorageService } from "../services/localstorage.service";

export class User{
    private LocalService:LocalStorageService
    constructor(
        private _token:string,
        private _refreshToken:string,
        private _tokenExpirationDate:Date,
        private userId:string,
    ){

    }
    get token(){
   
        if(!this._tokenExpirationDate || new Date( ) > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
    get user(){
        this.userId=this.LocalService.getItem("Token").userId
        if(this.userId == null)
        {
            return null;
        }
        return this.userId;
    }
}