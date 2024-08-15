import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../services/hotel.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { ReviewService } from '../../../services/review.service';
import { reviewModel } from '../../../model/Entities/review';
import { HotelModal } from '../../../model/Entities/hotelmodal';
import { UserService } from '../../../services/user.service';
import { userModal } from '../../../model/Entities/userModal';

@Component({
  selector: 'app-get-review',
  templateUrl: './get-review.component.html',
  styleUrl: './get-review.component.scss'
})
export class GetReviewComponent implements OnInit{

hotelModal:HotelModal[] = [];
reviewModel:reviewModel[] = [];
userId:string;
//kullanıcı adlarını gösterme
users:userModal[]
userMap: { [key: string]: any } = {}; 

//pagination

first: number = 0;
rows: number = 10;
totalCount: number = 0;

  constructor( 
    private localService:LocalStorageService,
    private hotelService:HotelService,
    private reviewService: ReviewService,
    private userService: UserService
  ){

  }

  ngOnInit(): void {

   this.userId=this.localService.getItem("Token").userId
    this.hotelService.getMyHotels(this.userId).subscribe(response => this.hotelModal=response );
  
    this.userService.get().subscribe(resp => {
      this.users= resp
      this.createUserMap()
    })
  }
  selectedHotelId:string
  onHotelSelect(event: Event){
    this.selectedHotelId = (event.target as HTMLSelectElement).value;
    this.loadReviews(this.selectedHotelId, this.first , this.rows); // Yeni verileri yükle (myHotel[0]?.id örnek olarak alındı, uygun bir ID kullanılmalı)
  }


  loadReviews(selectedHotelId: string, page: number, size: number): void {
    this.reviewService.getbyIdHotel(selectedHotelId, page, size).subscribe(response =>{
      this.reviewModel = response.reviews
      this.totalCount = response.totalCount
    });
  }


  // Kullanıcı ismini yorumlara göstermek için userMap
createUserMap(): void {
  this.userMap = {};
  this.users.forEach(userMap => {
    this.userMap[userMap.id] = userMap;
  });
}

// kullanıcı ismini idye göre getir
getUserName(userId: string): string {
  const user = this.userMap[userId];
  return user ? user.email : "Bilinmeyen Kişi";
}


onPageChange(event: any): void {
    
  this.first = event.first; // Sayfa başlangıç indeksini güncelle
  this.rows = event.rows; // Sayfa başına öğe sayısını güncelle
  const page = this.first / this.rows; // Sayfa numarasını hesapla
  this.loadReviews(this.selectedHotelId, page, this.rows); // Yeni verileri yükle (myHotel[0]?.id örnek olarak alındı, uygun bir ID kullanılmalı)
}


}
