import { Component, inject, OnInit } from '@angular/core';
import { HotelService } from '../../../../services/hotel.service';
import { HotelModal } from '../../../../model/Entities/hotelmodal';
import { MatDialog } from '@angular/material/dialog';
import { EditHotelComponent } from '../edit-hotel/edit-hotel.component';
import { LocalStorageService } from '../../../../services/localstorage.service';
import { ExtensionsComponent } from '../extensions/extensions.component';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrl: './my-hotels.component.scss'
})
export class MyHotelsComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  userId: string
  myHotel: HotelModal[] = [];
  constructor(
    private hotelService: HotelService,
    private localService: LocalStorageService) { }
  ngOnInit(): void {
    this.userId = this.localService.getItem("Token").userId;

    this.hotelService.getMyHotels(this.userId).subscribe(data => this.myHotel = data);
  }

  openDialog(hotelId: string) {
    const dialogRef = this.dialog.open(EditHotelComponent, { data: hotelId });
    dialogRef.afterClosed().subscribe(result => {
      this.hotelService.getMyHotels(this.userId).subscribe(data => this.myHotel = data);
    });
  }
  openExtensionsDialog(hotelId: string) {
    console.log(hotelId)
    const diagloRef = this.dialog.open(ExtensionsComponent, {
      data: { hotelId }
    });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://w7.pngwing.com/pngs/948/610/png-transparent-white-and-brown-hotel-building-illustration-hotel-manager-child-apps-hotel-illustration-hotels-lights-text-cloud-thumbnail.png';
  }
}
