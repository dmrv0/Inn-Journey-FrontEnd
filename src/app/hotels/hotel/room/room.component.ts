import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { RoomTypeService } from '../../../services/room-type.service';
import { roomModel } from '../../../model/Entities/room';
import { roomTypeModel } from '../../../model/Entities/room-type';
import { ReservationComponent } from '../reservation/reservation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoomExtensionsService } from '../../../services/room-extensions.service';
import { roomExtensionsModel } from '../../../model/Entities/ExtensionsModel/roomExtensions';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomModel: roomModel[] = [];
  roomTypeModal: roomTypeModel[] = [];
  roomTypeMap: { [key: string]: any } = {};
  roomExtensionsMap: { [key: string]: roomExtensionsModel[] } = {}; // Yeni bir yapı ekledik

  nowDate: Date = new Date(); // Şu anki tarihi alır
  @Input() hotelId: string = "";

  constructor(
    private RoomService: RoomService,
    private RoomTypeService: RoomTypeService,
    private dialog: MatDialog,
    private roomExtension: RoomExtensionsService
  ) { }

  ngOnInit(): void {
    this.RoomService.getRoomByHotelId(this.hotelId).subscribe(data => {
      this.roomModel = data;
      this.loadRoomExtensions(); // Oda eklentilerini yükleme fonksiyonu
    });
    this.RoomTypeService.get().subscribe(data => {
      this.roomTypeModal = data;
      this.createRoomTypeMap();
    });
  }

  createRoomTypeMap(): void {
    this.roomTypeMap = {};
    this.roomTypeModal.forEach(roomType => {
      this.roomTypeMap[roomType.id] = roomType;
    });
  }

  getRoomName(roomTypeId: string): string {
    const roomType = this.roomTypeMap[roomTypeId];
    return roomType ? roomType.name : "Bilinmeyen Oda";
  }

  openRezervation(hotelId: string, roomId: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '600px'; // Dialog genişliği
    dialogConfig.height = '800px'; // Dialog yüksekliği
    dialogConfig.data = { hotelId, roomId }; // Dialoga veri geçişi
    
    const dialogRef = this.dialog.open(ReservationComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      // Dialog kapandığında yapılacak işlemler
      console.log('Dialog kapandı, sonuç:', result);
    });
  }

  loadRoomExtensions() {
    this.roomModel.forEach(room => {
      this.roomExtension.getByRoomId(room.id).subscribe(extensions => {
        this.roomExtensionsMap[room.id] = extensions;
      });
    });
  }

  getRoomExtension(roomId: string): roomExtensionsModel[] {
    return this.roomExtensionsMap[roomId] || [];
  }
}
