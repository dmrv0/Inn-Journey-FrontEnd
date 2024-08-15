import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../../services/reservation.service';
import { reservationModel } from '../../../../model/Entities/reservation';
import { PaymentService } from '../../../../services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModel } from '../../../../model/Entities/payment';
import { ValidationService } from '../../../../services/validation.service';
import { userModal } from '../../../../model/Entities/userModal';
import { HotelModal } from '../../../../model/Entities/hotelmodal';
import { HotelService } from '../../../../services/hotel.service';
import { RoomTypeService } from '../../../../services/room-type.service';
import { RoomService } from '../../../../services/room.service';
import { roomTypeModel } from '../../../../model/Entities/room-type';
import { roomModel } from '../../../../model/Entities/room';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup
  userModel:userModal
  hotelModel:HotelModal
  roomTypeModel:roomTypeModel
  roomModel:roomModel
  paymentModel: PaymentModel
  reservationModal: reservationModel
  successEkrani:boolean = false // Ödeme başarılı olursa yeni component açmadan aynı sayfada işlem yapalım
  failrueEkrani:boolean = false
  loading:boolean =false;
  errorMessage:string = '';
  constructor(
    private activatedRoot: ActivatedRoute,
    private reservationService: ReservationService,
    private payService: PaymentService,
    private fb: FormBuilder,
   private hotelService:HotelService,
   private roomService:RoomService,
   private roomTypeService:RoomTypeService
  ) {

    this.paymentForm = this.fb.group({
      id: ["", Validators.required],
      userId: ["", Validators.required],
      roomId: ["", Validators.required],
      hotelId: ["", Validators.required],
      checkIn: ["", Validators.required],
      checkOut: ["", Validators.required],
      totalPrice: ["", Validators.required],
      status: ["", Validators.required],
      cardHolderName: ["", [Validators.required, ValidationService.cardholderNameValidator()]],
      cardNumber: ["", [Validators.required, ValidationService.creditCardNumberValidator()]],
      expireMonth: ["", [Validators.required]],
      expireYear: ["", [Validators.required]],
      cvc: ["", [Validators.required, ValidationService.creditCardCVVValidator()]]
    })
  }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params => {
      this.reservationService.getById(params['id']).subscribe(response => {
        this.reservationModal = response;
        this.formUpdate();
        this.hotelService.getHotelById(this.reservationModal.hotelId).subscribe(resp => {
          this.hotelModel = resp;
      
        });
  
        this.roomService.getById(this.reservationModal.roomId).subscribe(resp => {
          this.roomModel = resp;
       
          
          if (this.roomModel && this.roomModel.roomTypeId) {
            this.roomTypeService.getById(this.roomModel.roomTypeId).subscribe(roomTypeResp => {
              this.roomTypeModel = roomTypeResp;
       
            }, error => {
              console.error('Error fetching room type:', error);
            });
          } else {
            console.warn('Room Model or Room Type ID is missing');
          }
        }, error => {
          console.error('Error fetching room details:', error);
        });
      }, error => {
        console.error('Error fetching reservation details:', error);
      });
    });
  }

  odemeyap() {
    debugger;
    if (this.paymentForm.valid) {
    //   this.payService.odeme(this.paymentForm.value).subscribe(response => {
     
    //     if (response.status === 'success') {
    //       this.reservationModal.status = "PC"
    //       this.reservationModal.deleted = false;
    //       this.reservationService.update(this.reservationModal).subscribe(data => 
    //         console.log(data)
    //       )
    //       this.successEkrani = true;
    //     } else {
    //       // Başarısız ödeme durumu için işlemler
    //       this.failrueEkrani =true;
    //     }
    //   }, error => {
    //     console.error('Ödeme işlemi sırasında hata oluştu:', error);
    //     alert('Ödeme işlemi sırasında hata oluştu. Lütfen tekrar deneyin.');
    //   });
    // } else {
    //   console.error('Form geçerli değil:', this.paymentForm);
    //   alert('Lütfen gerekli tüm alanları doldurun.');
    // }

this.loading = true
    this.payService.odeme(this.paymentForm.value).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.reservationModal.status = "PC"
          this.reservationModal.deleted = false;
          this.reservationService.update(this.reservationModal).subscribe(data => 
            console.log(data)
          )
          this.successEkrani = true;
        } 
        else {
          // Başarısız ödeme durumu için işlemler
          this.failrueEkrani =true;
        }
       if(resp.errorMessage)
        { 
          this.errorMessage = resp.errorMessage
        }
      
         }
         ,
      error:(err) =>{
        this.loading = false;
          console.error('Ödeme işlemi sırasında hata oluştu:', err);
          alert('Ödeme işlemi sırasında hata oluştu. Lütfen tekrar deneyin.');
      },
      complete: () =>  {
        this.loading = false;
      },
    })
  }

  }

  formUpdate() {
    this.paymentForm.patchValue({
      id: this.reservationModal.id,
      userId: this.reservationModal.userId,
      roomId: this.reservationModal.roomId,
      hotelId: this.reservationModal.hotelId,
      checkIn: this.reservationModal.checkIn,
      checkOut: this.reservationModal.checkOut,
      totalPrice: this.reservationModal.totalPrice,
      status: this.reservationModal.status
    });
  }



 

}
