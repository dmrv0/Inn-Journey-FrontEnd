import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ReservationService } from '../../services/reservation.service';
import { reservationModel } from '../../model/Entities/reservation';
import { LocalStorageService } from '../../services/localstorage.service';
import { HotelService } from '../../services/hotel.service';
import { HotelModal } from '../../model/Entities/hotelmodal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MyReservationsComponent implements OnInit {

  errorMessage: string = "";
  hotelModel: { [key: string]: HotelModal } = {};
  myReservation: reservationModel[] = [];
  paginatedReservations: reservationModel[] = [];
  currentPageNo: number = 0;
  totalPageCount: number;
  totalCount: number;
  pageSize: number = 5;
  pageList: number[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private reservationService: ReservationService,
    private localService: LocalStorageService,
    private hotelService: HotelService,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservationByUserId(this.localService.getItem("Token").userId, this.currentPageNo, this.pageSize).subscribe(resp => {
      this.myReservation = resp;
      this.totalCount = resp.length > 0 ? resp[0].totalCount : 0; // Toplam öğe sayısını al
      if (this.paginator) {
        this.paginator.length = this.totalCount; // Paginator'ın length özelliğini ayarla
      }
      this.paginate();
      this.loadHotelDetails();
    });
  }

  loadHotelDetails(): void {
    const hotelIds = Array.from(new Set(this.myReservation.map(reservation => reservation.hotelId)));
    hotelIds.forEach(hotelId => {
      this.hotelService.getHotelById(hotelId).subscribe(resp => {
        this.hotelModel[hotelId] = resp;
      });
    });
  }

  paginate(): void {
    const start = (this.currentPageNo - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedReservations = this.myReservation.slice(start, end);
  }

  onPageChange(event: any): void {
    this.currentPageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadReservations();
  }

  getHotelName(hotelId: string): string {
    const hotel = this.hotelModel[hotelId];
    return hotel ? hotel.name : "Bilinmeyen Otel";
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PC':
        return 'active';
      case 'PNC':
        return 'inactive';
      default:
        return '';
    }
  }

  cancelReservation(reservation: reservationModel): void {
    if (reservation.id != null) {
      reservation.deleted = true;
      this.reservationService.update(reservation).subscribe(response => {
        if (response.success) {
          this._snackBar.open('Randevu Başarıyla İptal Edildi.', '', { duration: 5000 });
        } else {
          this._snackBar.open('Randevu iptal edilirken bir hata oluştu: ' + response.message, '', { duration: 5000 });
        }
      });
    }
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


  //primeNG ConfirmDialog

  confirm2(event: Event, reservation: reservationModel) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bu Rezervasyonu iptal etmek istediğine emin misin?',
        header: 'İptal için onayla',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel:"Evet",
        rejectLabel: "Hayır",

        accept: () => {
          this.cancelReservation(reservation)
        },
        reject: () => {
           
        }
    });
}
}
