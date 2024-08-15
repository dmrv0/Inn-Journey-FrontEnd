import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModal } from '../../../../model/Entities/hotelmodal';
import { HotelService } from '../../../../services/hotel.service';
import { RoomTypeService } from '../../../../services/room-type.service';
import { RoomService } from '../../../../services/room.service';
import { LocalStorageService } from '../../../../services/localstorage.service';
import { ValidationService } from '../../../../services/validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { roomExtensionsModel } from '../../../../model/Entities/ExtensionsModel/roomExtensions';
import { RoomExtensionsService } from '../../../../services/room-extensions.service';
import { roomTypeModel } from '../../../../model/Entities/room-type';
import { ExtensionsRepository } from '../../../../model/extensionsRepository';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'] // styleUrl -> styleUrls
})
export class AddRoomComponent implements OnInit {

  public roomForm: FormGroup;
  public myHotels: HotelModal[];
  public roomType: roomTypeModel[];
  public userId: string;
  public errorMessage: string;
  public myExtensions: roomExtensionsModel[] = [];
  public roomExtensionPanel: roomExtensionsModel[] = []; // Initialize with empty array

  constructor(
    private formBuilder: FormBuilder,
    private hotelsService: HotelService,
    private roomTypeService: RoomTypeService,
    private roomService: RoomService,
    private localService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private extensionService:RoomExtensionsService,
    private extensionsRepository: ExtensionsRepository // Inject the service
  ) {

    
    this.userId = this.localService.getItem("Token").userId;
    this.roomTypeService.get().subscribe(response => this.roomType = response);
    this.hotelsService.getMyHotels(this.userId).subscribe(data => this.myHotels = data);
    this.roomForm = this.formBuilder.group({
      hotelId: ['', Validators.required],
      roomTypeId: ['', Validators.required],
      AdultPrice: [null, ValidationService.adultPriceValidator()],
      ChildPrice: [null, [Validators.required, ValidationService.childPriceValidator()]],
      Capacity: [0, Validators.required],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.roomExtensionPanel = [...this.extensionsRepository.roomExtensions];
  
  }
  
  onSubmit() {
    if (this.roomForm.valid) {
      if (this.myExtensions.length > 0 && this.myExtensions.length <= 5) {
        console.log(this.roomForm.value);
        this.roomService.add(this.roomForm.value).subscribe(response => {
          const roomId = response.roomId; // API'den dönen oda ID'sini alın
          // `myExtensions` koleksiyonunu API'nin beklediği formata dönüştürün
          const formattedExtensions = this.myExtensions.map(extension => ({
            roomId: roomId,  // Her eklentiye oda ID'sini ekleyin
            iconUrl: extension.iconUrl,
            name: extension.name
          }));
    
            // Formatlanmış eklentileri API'ye uygun yapıda gönderin
            this.extensionService.add({ roomExtensions: formattedExtensions }).subscribe(() => {
              this._snackBar.open('Oda başarıyla eklendi.', '', { duration: 4000 });
              this.router.navigate(["hotels/admin/getRoom"]);
            }, error => {
              console.error('Room Extensions ekleme başarısız:', error);
              this.errorMessage = 'Oda eklentilerini eklerken bir hata oluştu. Hata Mesajı:' + error;
            });
          },
        (error) => {
          console.error('Oda ekleme başarısız:', error);
          this.errorMessage = 'Oda eklerken bir hata oluştu. Hata Mesajı:' + error;
        });
      }
    }
  }
  
 
  drop(event: CdkDragDrop<roomExtensionsModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data === this.myExtensions && this.myExtensions.length >= 5) {
        this.errorMessage = 'En fazla 5 Adet Eklenti Ekleyebilirsiniz';
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Geçici olarak yapılan değişiklikler
      this.errorMessage = '';
    }
  }
  
}
