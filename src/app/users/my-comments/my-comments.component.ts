import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { ReviewService } from '../../services/review.service';
import { reviewModel } from '../../model/Entities/review';
import { PageEvent } from '@angular/material/paginator';
import { HotelService } from '../../services/hotel.service';
import { HotelModal } from '../../model/Entities/hotelmodal';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrl: './my-comments.component.scss'
})
export class MyCommentsComponent  implements OnInit{
 
  reviewsModel:reviewModel[]
  hotelModel: HotelModal[] = [];
  first: number = 0;
  rows: number = 10;
  totalCount:number
  constructor(
    private localService:LocalStorageService,
    private reviewService:ReviewService,
    private hotelService:HotelService
  ) { }

  ngOnInit(): void {
    this.loadReviews(this.first, this.rows);

  }

  loadReviews(page: number, size: number): void {
    this.reviewService.getByUserId(this.localService.getItem("Token").userId, page, size).subscribe(resp => {
      this.reviewsModel = resp.reviews;
      this.totalCount = resp.totalCount; // Toplam kayıt sayısını güncelleyin
      this.loadHotelNames(this.reviewsModel.map(review => review.hotelId));
    });

  }

 onPageChange(event: any): void {
    const page = event.first / event.rows; // Sayfa numarasını hesapla
    this.rows = event.rows; // Sayfa başına öğe sayısını güncelle
    this.loadReviews(page, this.rows); // Yeni verileri yükle
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? i : i - 1); // Yıldızları ratinge göre döndür
  }
  loadHotelNames(hotelIds: string[]): void {
    if (hotelIds.length > 0) {
      this.hotelService.getHotelsName(hotelIds).subscribe(resp => {
        this.hotelModel = resp.hotels;
      });
    }
  }
  getHotelName(id: string): string {
    const hotel = this.hotelModel.find(h => h.id === id);
    return hotel ? hotel.name : 'Bilinmeyen Hotel';
  }
  
}
