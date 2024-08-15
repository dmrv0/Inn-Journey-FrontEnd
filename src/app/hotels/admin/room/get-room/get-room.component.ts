import { Component, inject, OnInit } from '@angular/core';
import { HotelService } from '../../../../services/hotel.service';
import { RoomService } from '../../../../services/room.service';
import { HotelModal } from '../../../../model/Entities/hotelmodal';
import { roomModel } from '../../../../model/Entities/room';
import { LocalStorageService } from '../../../../services/localstorage.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRoomComponent } from '../update-room/update-room.component';
import { ExtensionsRoomComponent } from '../extensions-room/extensions-room.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-get-room',
  templateUrl: './get-room.component.html',
  styleUrl: './get-room.component.scss'
})
export class GetRoomComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  myHotel:HotelModal[];
  myRoom:roomModel[] = [];
  userId:string;
  constructor(
    private localService:LocalStorageService,
    private hotelService:HotelService,
    private roomService:RoomService,
    private confirmationService: ConfirmationService
  ){


  }
  ngOnInit(): void {
    this.userId = this.localService.getItem("Token").userId;
    this.hotelService.getMyHotels(this.userId).subscribe(data => this.myHotel=data)
  }
   selectedHotelId : string = ""
  onHotelSelect(event: Event){
    this.selectedHotelId = (event.target as HTMLSelectElement).value;
    console.log(this.selectedHotelId) //test
    this.roomService.getRoomByHotelId(this.selectedHotelId).subscribe(res => this.myRoom = res);
  }

  editRoom(roomId:string)
  {
    const diagloRef= this.dialog.open(UpdateRoomComponent ,{ data: {roomId}
    });
  }



  confirmDelete(roomId: string, event: Event) {
    // Tarayıcı onay penceresini göster
    const confirmed = window.confirm('Bu odayı silmek istediğinize emin misiniz?');
    
    if (confirmed) {
      // Kullanıcı onayladıysa oda silme işlemini yap
      this.deleteRoom(roomId, event);
    }
  }

  deleteRoom(roomId: string, event: Event) {
    this.roomService.delete(roomId).subscribe(() => {
      // Silme işlemi başarılı olduğunda yapılacak işlemler
      this.onHotelSelect(event);
      this.roomService.getRoomByHotelId(this.selectedHotelId).subscribe(res => this.myRoom = res);
    });
  }
  showExtensionsRoom(roomId: string) {
    const dialogRef = this.dialog.open(ExtensionsRoomComponent, {
      data: { roomId },
      panelClass: 'custom-dialog-container' // Buraya stil sınıfını ekleyin
    });
  }
  

  
  


}
