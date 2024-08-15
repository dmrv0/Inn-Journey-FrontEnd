import { Component, Inject, OnInit } from '@angular/core';
import { hotelExtensionsModel } from '../../../../model/Entities/ExtensionsModel/hotelExtensions';
import { HotelExtensionsService } from '../../../../services/hotel-extensions.service';
import { ExtensionsRepository } from '../../../../model/extensionsRepository';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.scss'
})
export class ExtensionsComponent implements OnInit{
  extensionsModel: hotelExtensionsModel[] = [];
  public myExtensions: hotelExtensionsModel[] = [];
  public hotelExtensionPanel: hotelExtensionsModel[] = [];
  public errorMessage: string;

  constructor(
    private extensionsService: HotelExtensionsService,
    private extensionsRepository: ExtensionsRepository,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { hotelId: string },
  ) { }

  ngOnInit(): void {
    console.log(this.data.hotelId)
    if (this.data.hotelId) {

      // API'den oda bilgilerini al
      this.extensionsService.getByHotelId(this.data.hotelId).subscribe(resp => {
        this.extensionsModel = resp;
        this.myExtensions = this.extensionsModel
        console.log(resp)

        this.hotelExtensionPanel = [...this.extensionsRepository.hotelExtensions];
        // Aynı olanları ayıklama
        this.filterOutUsedExtensions();
      });
    }
  }

  // Aynı olanları ayıkla
  filterOutUsedExtensions(): void {
    this.hotelExtensionPanel = this.hotelExtensionPanel.filter(
      extension => !this.extensionsModel.some(
        usedExtension => usedExtension.name === extension.name && usedExtension.iconUrl === extension.iconUrl
      )
    );
  }

  onSubmit() {
    const formattedExtensions = this.myExtensions.map(extension => ({
      hotelId: this.data.hotelId,
      iconUrl: extension.iconUrl,
      name: extension.name
    }));

    this.extensionsService.update({ hotelExtensions: formattedExtensions }).subscribe(resp => {

      if (resp.success) {
        this._snackBar.open('Eklentiler başarıyla güncellendi..', '', { duration: 4000 });
      }
      else {
        this._snackBar.open('Eklentiler güncellenirken bir hata oluştu..', '', { duration: 4000 });
      }
    })
  }
  drop(event: CdkDragDrop<hotelExtensionsModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data === this.myExtensions && this.myExtensions.length >= 9) {
        this.errorMessage = 'En fazla 5 Adet Eklenti Ekleyebilirsiniz';
        return;
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.errorMessage = '';
    }
  }
}
