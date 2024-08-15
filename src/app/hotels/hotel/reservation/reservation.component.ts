import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { roomTypeModel } from '../../../model/Entities/room-type';
import { roomModel } from '../../../model/Entities/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from '../../../services/room.service';
import { RoomTypeService } from '../../../services/room-type.service';
import { ReservationService } from '../../../services/reservation.service';
import { reservationModel } from '../../../model/Entities/reservation';
import { LocalStorageService } from '../../../services/localstorage.service';
import {  Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {


  hotelId: string //Parametreden aldıgım idyi atamak için oluşturuldu.
  userId:string
  roomId:string
  roomType: roomTypeModel[];
  Room: roomModel;
  totalPrice: number;
  range: FormGroup; // FormGroup tanımı
  selectedRoom: any = null;
  roomPricePerNight: number = 0;
  reservationModel: reservationModel;
  public reservationForm:FormGroup
  // Check-in ve check-out tarihlerini saklayan değişkenler
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;

  errorMessage:string = '';


  /*
===============================
      #DATE RENKLENDİRME
===============================
*/
rezModel: reservationModel[]
dateProductMap: Map<string, number> = new Map(); // Tarih ve doluluk sayısını saklayan bir Map
date: Date | null = null; // Seçili tarih
capacity: number= 1 // Oda kapasitesi (örnek olarak 5)

   
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hotelId: string , roomId:string},
    private roomService: RoomService, //oda bilgilerini çekmek için room servisini çağırdık
    private roomTypeService: RoomTypeService,
    private formBuilder: FormBuilder, // FormBuilder eklenmesi
    private localService: LocalStorageService, // user id için local servis
    private reservationService: ReservationService,
    private router:Router,
    public dialogRef: MatDialogRef<ReservationComponent>
  ) {
    this.hotelId = data.hotelId; //aldigimiz idyi hotelId'ye aktardık.
    this.roomId = data.roomId
    this.userId = this.localService.getItem("Token").userId; //localstorageden aldıgım token idyi userIdye aktardım.
    console.log(this.userId)
  

    this.range = new FormGroup({  //İki adet tarih nesnesini grup olarak interface tanımladık.
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
 

    this.reservationForm = this.formBuilder.group({ //model ile göndermek için Form oluşturduk. Validator ile null kontrolü yaptık.
      userId: [this.userId, Validators.required],
      hotelId: [this.hotelId, Validators.required],
      roomId: [this.roomId, Validators.required],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
      totalPrice: [this.totalPrice ?? 0, Validators.required],
      status: ["PNC", Validators.required]
    });
  }


  ngOnInit(): void {
    this.roomService.getById(this.roomId).subscribe(rooms => {
      this.Room = rooms;
      this.roomTypeService.get().subscribe(roomType =>
        this.roomType = roomType
      );
    });
  
    this.roomService.getById(this.roomId).subscribe(resp => {
      this.roomPricePerNight = resp.adultPrice;
      this.capacity = resp.capacity;
    });
  
    this.reservationService.getReservationByRoomId(this.roomId).subscribe(resp => {
      this.rezModel = resp;
      this.updateDateProductMap(); // Bileşen başlatıldığında tarih haritasını güncelle
    });
  }
  

  getRoomTypeName(roomTypeId: string): string { // Oda isimlerini. Oda tiplerinin yanına getirdik
    if (this.roomType && this.roomType.length > 0) {
      const roomType = this.roomType.find(rt => rt.id === roomTypeId);
      return roomType ? roomType.name : '';
    } else {
      return 'Bir hata oluştu';
    }
  }

  // Check-in ve check-out tarihleri arasındaki gün sayısını hesaplayan fonksiyon
  calculateTotalPrice(): number {
    if (this.checkInDate && this.checkOutDate && this.roomPricePerNight) {
      const checkIn = new Date(this.checkInDate).setHours(0, 0, 0, 0); //saatleri 0a çektik düzgün hesaplama için
      const checkOut = new Date(this.checkOutDate).setHours(0, 0, 0, 0);
      const diffInTime = checkOut - checkIn;  //Aradaki zamanı bulmak için
      const diffInDays = diffInTime / (1000 * 3600 * 24); //Fiyat hesaplama için zaman hesabı: 24 Saatte bir artıyor fiyat
      return diffInDays * this.roomPricePerNight;
    }
    return 0;
  }


  // Check-in tarihini seçerken bugünden sonraki ve check-out tarihinden önceki günler seçilebilir
  checkInFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkOut = this.checkOutDate ? new Date(this.checkOutDate) : null;
    if (checkOut) {
      checkOut.setHours(0, 0, 0, 0);
    }
    return (d || today) >= today && (!checkOut || (d || today) < checkOut);
  };

  // Check-out tarihini seçerken sadece check-in tarihinden sonraki günler seçilebilir
  checkOutFilter = (d: Date | null): boolean => {
    if (!this.checkInDate) {
      return true; // Eğer check-in tarihi seçilmemişse, tüm tarihler seçilebilir
    }
    const checkIn = new Date(this.checkInDate);
    checkIn.setHours(0, 0, 0, 0);
    return (d || checkIn) > checkIn;
  };

  // Check-in tarihi seçildiğinde check-out tarihini sıfırla
  onCheckInDateChange(event: any): void {
    this.checkInDate = event.value;
    this.totalPrice = this.calculateTotalPrice(); // Toplam fiyatı hesapla
    this.reservationForm.patchValue({ totalPrice: this.totalPrice }); // Formu güncelle
  
    this.checkOutDate = null; // Check-out tarihini sıfırla
  }

  // Check-out tarihi değiştiğinde check-in tarihini kontrol et
  onCheckOutDateChange(event: any): void { 
    debugger;
    this.checkOutDate = event.value;
    this.totalPrice = this.calculateTotalPrice(); // Toplam fiyatı hesapla
    this.reservationForm.patchValue({ totalPrice: this.totalPrice }); // Formu güncelle
    if (this.checkInDate && this.checkInDate >= this.checkOutDate) {  //eğer giriş tarihi çıkış tarihinden büyük ise güvenlik için sıfırla.
      this.checkInDate = null; // Check-in tarihini sıfırla
      this.totalPrice = this.calculateTotalPrice(); // Toplam fiyatı hesapla
      this.reservationForm.patchValue({ totalPrice: this.totalPrice }); // Formu güncelle
    }
  }

  
  addReservation(): void{
    console.log(this.reservationForm.value)
    var resId:any;
     this.reservationService.add(this.reservationForm.value).subscribe(resp => 
      {
        const resId = resp.id; // resp.id'yi resId'ye atar
       console.log("ilk" +resp.id)
       if(resp.success){
       this.dialogRef.close(); // Dialog penceresini kapatır
       this.router.navigate(['/payment/'+resId]);
       }
       else if(resp.success==false){
          this.errorMessage = resp.message
       }

      }
    )

    
    }



/*
===============================
      #DATE RENKLENDİRME
===============================
*/


updateDateProductMap(): void {
  this.dateProductMap.clear(); // Önceden var olan verileri temizle
  
  // Her bir rezervasyonu işle
  this.rezModel.forEach(reservation => {
    const startDate = new Date(reservation.checkIn); // Rezervasyon başlangıç tarihi
    const endDate = new Date(reservation.checkOut); // Rezervasyon bitiş tarihi

    // Bitiş tarihini bir gün artırarak son günü dahil et
    startDate.setDate(startDate.getDate());
    endDate.setDate(endDate.getDate());

    // Eğer tarih aralığını kontrol etmek istiyorsanız, tarihleri kontrol edebilirsiniz:
    const dateStrStart = this.formatDate(startDate); // Başlangıç tarihini formatla
    const dateStrEnd = this.formatDate(endDate); // Bitiş tarihini formatla

    // Başlangıç tarihinden bitiş tarihine kadar doluluk sayısını güncelle
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = this.formatDate(d); // Tarihi YYYY-MM-DD formatına dönüştür
      this.dateProductMap.set(dateStr, (this.dateProductMap.get(dateStr) || 0) + 1); // Tarih ile doluluk sayısını güncelle
    }
  });
}

  
  // Günün stilini hesaplar ve geri döndürür
  getDayStyle(date: { day: number, month: number, year: number }): { [key: string]: string } {
    const currentDate = new Date(date.year, date.month , date.day); // PrimeNG formatındaki günü Date nesnesine dönüştür
    const dateStr = this.formatDate(currentDate); // YYYY-MM-DD formatında string oluştur
    const totalCount = this.dateProductMap.get(dateStr) || 0; // Gün için doluluk sayısını al
   
    // Kapasiteye göre yüzdesel doluluk hesaplama
    const capacityPercentage = (totalCount / this.capacity) * 100;

    // Günün rengi ve stilini belirle
    let color = 'lightgreen'; // Varsayılan renk
    let fontWeight = 'normal';

    if (capacityPercentage >= 80) {
      color = 'red'; // %80 ve üzeri
      fontWeight = 'bold'; // Koyu font
    } else if (capacityPercentage >= 60) {
      color = 'yellow'; // %60 - %79
      fontWeight = 'bold'; // Koyu font
    }

    return {
      color: color, // Arka plan rengini belirle
      fontWeight: fontWeight, // Font ağırlığını belirle
      pointerEvents: capacityPercentage >= 100 ? 'none' : 'auto' // Eğer kapasite %100'ün üzerindeyse, seçilemez yap
    };
  
  }

  // Tarihleri YYYY-MM-DD formatında döndürür
  formatDate(date: Date): string {

    const day = date.getUTCDate().toString().padStart(2, '0'); // Gün kısmını formatla
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Ay kısmını formatla (1 ekleyin çünkü getUTCMonth() 0 tabanlıdır)
    const year = date.getUTCFullYear(); // Yıl kısmını al
    return `${year}-${month}-${day}`; // YYYY-MM-DD formatında geri döndür
    
  }






}
