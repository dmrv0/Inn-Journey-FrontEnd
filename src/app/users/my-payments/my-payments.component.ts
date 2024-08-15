import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { PaymentService } from '../../services/payment.service';
import { PaymentModel } from '../../model/Entities/payment';
import { HotelService } from '../../services/hotel.service';
import { HotelModal } from '../../model/Entities/hotelmodal';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.scss'
})
export class MyPaymentsComponent implements OnInit {

  //Pagination Baslangic
  currentPageNo: number = 0;
  totalPageCount: number;
  totalCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  paginatedPayment: PaymentModel[]
  //Pagination Bitis

  @ViewChild(MatPaginator) paginator: MatPaginator;
  paymentModel: PaymentModel[]
  hotelModel: HotelModal[] = [];
  hotelMap: { [key: string]: any } = {}; 
  constructor(
    private localService:LocalStorageService,
    private paymentService:PaymentService,
    private hotelService:HotelService
  ) {
  
  }
  ngOnInit(): void {
    if (this.paginator) {
      this.paginator.length = this.totalCount; // Paginator'ın length özelliğini ayarla
    }
 
    this.loadPayments();

  }

  loadPayments():void{
    this.paymentService.getByUserId(this.localService.getItem("Token").userId,this.currentPageNo,this.pageSize).subscribe(resp => {
     
      this.totalCount = resp.payments.length > 0 ? resp.totalCount : 0; // Toplam öğe sayısını al
      this.paymentModel = resp.payments 
      this.loadHotelNames(this.paymentModel.map(resp => resp.hotelId));
      if (this.paginator) {
        this.paginator.length = this.totalCount; // Paginator'ın length özelliğini ayarla
      }
    })
  }

  paginate(): void {
    const start = (this.currentPageNo) * this.pageSize;
    const end = start + this.pageSize;
   this.loadPayments()
   this.paginate();
  }
  

  
  onPageChange(event: any): void {
    this.currentPageNo = event.pageIndex; // Sayfa numarasını 1 tabanlı olarak ayarla
    this.pageSize = event.pageSize;
    this.loadPayments(); // Veriyi yeniden yükle
  }
  

  
  calculatePageList(): number[] {
    const pageList: number[] = [];
    const delta = 3;

    let startPage = Math.max(1, this.currentPageNo - delta);
    let endPage = Math.min(this.totalPageCount, this.currentPageNo + delta);

    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }

    return pageList;
  }



  //region Hotel
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
