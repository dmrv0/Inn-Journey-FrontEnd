import { Component, Inject, OnInit } from '@angular/core';
import { RoomExtensionsService } from '../../../../services/room-extensions.service';
import { roomExtensionsModel } from '../../../../model/Entities/ExtensionsModel/roomExtensions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExtensionsRepository } from '../../../../model/extensionsRepository';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-extensions-room',
  templateUrl: './extensions-room.component.html',
  styleUrls: ['./extensions-room.component.scss'] // Düzeltilmiş
})
export class ExtensionsRoomComponent implements OnInit {
  extensionsModel: roomExtensionsModel[] = [];
  public myExtensions: roomExtensionsModel[] = [];
  public roomExtensionPanel: roomExtensionsModel[] = [];

  public errorMessage: string;

  constructor(
    private extensionsService: RoomExtensionsService,
    private extensionsRepository: ExtensionsRepository,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string },
  ) { }

  ngOnInit(): void {
    if (this.data.roomId) {
      // API'den oda bilgilerini al
      this.extensionsService.getByRoomId(this.data.roomId).subscribe(resp => {
        this.extensionsModel = resp;
        this.myExtensions = this.extensionsModel
        console.log(resp)
        // Repository'den tüm eklentileri al
        this.roomExtensionPanel = [...this.extensionsRepository.roomExtensions];
        // Aynı olanları ayıklama
        this.filterOutUsedExtensions();
      });
    }
  }

  // Aynı olanları ayıkla
  filterOutUsedExtensions(): void {
    this.roomExtensionPanel = this.roomExtensionPanel.filter(
      extension => !this.extensionsModel.some(
        usedExtension => usedExtension.name === extension.name && usedExtension.iconUrl === extension.iconUrl
      )
    );
  }

  onSubmit() {
    const formattedExtensions = this.myExtensions.map(extension => ({
      roomId: this.data.roomId,
      iconUrl: extension.iconUrl,
      name: extension.name
    }));

    this.extensionsService.update({ roomExtensions: formattedExtensions }).subscribe(resp => {

      if (resp.success) {
        this._snackBar.open('Eklentiler başarıyla güncellendi..', '', { duration: 4000 });
      }
      else {
        this._snackBar.open('Eklentiler güncellenirken bir hata oluştu..', '', { duration: 4000 });
      }
    })
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
      this.errorMessage = '';
    }
  }
}
