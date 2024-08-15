import { Component, inject, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { HotelModal } from '../../model/Entities/hotelmodal';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ReservationComponent } from './reservation/reservation.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss'
})
export class HotelComponent implements OnInit{

  hotel: HotelModal;
  readonly dialog = inject(MatDialog); //dialogpenceresi için
  constructor(
    private hotelService: HotelService,
    private activatedRoot: ActivatedRoute,
    private sanitizer: DomSanitizer //gelen veriyi html'e çevirmek için
  ){

  }
  ngOnInit(): void {
      this.activatedRoot.params.subscribe(params=> 
      {
        this.hotelService.getHotelById(params["id"]).subscribe(data => { this.hotel=data})
      }
      )
  }

  openRezervation(hotelId:string){
    const diagloRef= this.dialog.open(ReservationComponent ,{ data: {hotelId}
    });
    }
    getSafeGoogleMap(): SafeHtml { //html çevir ve döndür
      return this.sanitizer.bypassSecurityTrustHtml(this.hotel.googleMap);
    }




    getStarArray(star:number): number[] {
      return Array(star || 0).fill(0);
    }
}
