import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { HotelService } from '../../../services/hotel.service';
import { HotelModal } from '../../../model/Entities/hotelmodal';
import { PaymentModel } from '../../../model/Entities/payment';
import { LocalStorageService } from '../../../services/localstorage.service';
import { userModal } from '../../../model/Entities/userModal';
import { CustomersComponent } from '../customers/customers.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  myHotel: HotelModal[] = [];
  paymentModal: PaymentModel[] = [];
  first: number = 0;
  rows: number = 10;
  totalCount: number = 0;

  userModel:userModal[] = [];

  constructor(
    private paymentService: PaymentService,
    private hotelService: HotelService,
    private localService: LocalStorageService,
    private dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const userId = this.localService.getItem("Token")?.userId;
    if (userId) {
      this.hotelService.getMyHotels(userId).subscribe(resp => {
        this.myHotel = resp;
      }
    );
    }
  }
  selectedHotelId:string
  onHotelSelect(event: Event): void {
    this.selectedHotelId = (event.target as HTMLSelectElement).value;
    this.loadReviews(this.selectedHotelId, this.first, this.rows);
  }

  loadReviews(selectedHotelId: string, page: number, size: number): void {
    this.paymentService.getByHotelId(selectedHotelId, page, size).subscribe(res => {
    
      if (res && res.length > 0) {
        this.paymentModal = res; // Ödemeleri al
        this.totalCount = res[0].totalCount; // İlk öğeden totalCount'ı al
        this.totalCount = res[0]?.totalCount ?? 0;
        this.loadUsersName(this.paymentModal.map(resp=> resp.userId))
      } else {
        this.paymentModal = [];
        this.totalCount = 0; // Veri yoksa toplam sayıyı sıfır yap
      }


    });
  }

  onPageChange(event: any): void {
    
    this.first = event.first; // Sayfa başlangıç indeksini güncelle
    this.rows = event.rows; // Sayfa başına öğe sayısını güncelle
    const page = this.first / this.rows; // Sayfa numarasını hesapla
    this.loadReviews(this.selectedHotelId, page, this.rows); // Yeni verileri yükle (myHotel[0]?.id örnek olarak alındı, uygun bir ID kullanılmalı)
  }




  

  loadUsersName(userId: string[]): void {
    if (userId.length > 0) {
      this.userService.getByIdsUser(userId).subscribe(resp => {
        this.userModel = resp.users;
      });
    }
  }
  
  getUsersName(id: string): string {
    const user = this.userModel.find(u => u.id === id);
    return user ? ("Kullanıcı Adı: "+user.userName) : 'Bilinmeyen Kullanıcı';
  }
  
  getUser(userId:string):void{
    this.dialog.open(CustomersComponent, {data: userId})
  }

  
  


}
