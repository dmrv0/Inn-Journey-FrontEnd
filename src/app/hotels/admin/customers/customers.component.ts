import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { userModal } from '../../../model/Entities/userModal';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent{
  userId:string = '';
  userModal:userModal
  constructor(
    public dialogRef: MatDialogRef<CustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private userService: UserService
  ) {

this.userId = this.data

if(this.userId){   
  this.userService.getByIdUser(this.userId).subscribe(response => this.userModal = response)
}
  }

  closeDialog(): void {
    this.dialogRef.close('some result');
  }
}
