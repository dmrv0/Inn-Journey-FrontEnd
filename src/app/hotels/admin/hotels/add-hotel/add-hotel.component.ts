import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../../../services/hotel.service';
import { LocalStorageService } from '../../../../services/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExtensionsRepository } from '../../../../model/extensionsRepository';
import { HotelExtensionsService } from '../../../../services/hotel-extensions.service';
import { hotelExtensionsModel } from '../../../../model/Entities/ExtensionsModel/hotelExtensions';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent implements OnInit {
  public hotelForm:FormGroup
  public userId:string
 public errorMessage:string
  public myExtensions: hotelExtensionsModel[] = [];
  public hotelExtensionPanel: hotelExtensionsModel[] = []; 
  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private localService:LocalStorageService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private extensionsRepository: ExtensionsRepository, 
    private extensionService: HotelExtensionsService
  ){
    this.userId=this.localService.getItem("Token").userId

    this.hotelForm = this.formBuilder.group({
      userId: [this.userId ,],
      name: ['', ],
      address: ['',],
      phone: ['',],
      email: ['', ], // Email doğrulaması ekledik
      description: ['', ],
      star: [null, ], // Min ve Max doğrulaması ekledik
      standartRoomPrice: [null],
      googleMap: ['', ],
      imageUrl: ['', ]
    });


  }
  
  ngOnInit(): void {
    this.hotelExtensionPanel = [...this.extensionsRepository.hotelExtensions];

  }



    onSubmit() {
     
        if (this.myExtensions.length > 0 && this.myExtensions.length <= 5) {
          if (this.hotelForm.valid) {
            this.hotelService.addHotel(this.hotelForm.value).subscribe(response => {
              const hotelId = response.hotelId

              const formattedExtensions = this.myExtensions.map(extension => ({
                hotelId: hotelId,  // Her eklentiye oda ID'sini ekleyin
                iconUrl: extension.iconUrl,
                name: extension.name
              }));

               this._snackBar.open( 'Hotel başarıyla eklendi..','',{ duration:4000 });
               this.router.navigate(['hotels/admin/myHotels']); // Rota yolunu güncelleyin


               this.extensionService.add({ hotelExtensions : formattedExtensions }).subscribe(() => {
                this._snackBar.open('Hotel başarıyla eklendi.', '', { duration: 4000 });
                // this.router.navigate(["hotels/admin/getHotels"]);
              }, error => {
                console.error('Hotel Extensions ekleme başarısız:', error);
                this.errorMessage = 'Otel eklentilerini eklerken bir hata oluştu. Hata Mesajı:' + error;
              });
            },
            (error) => {
              console.error('Otel ekleme başarısız:', error);
              this.errorMessage = 'Otel eklerken bir hata oluştu. Hata Mesajı:' + error;
            });

            // Formatlanmış eklentileri API'ye uygun yapıda gönderin
        }
        }
      
    }

    
  drop(event: CdkDragDrop<hotelExtensionsModel[]>) {
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

