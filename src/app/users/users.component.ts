import { Component } from '@angular/core';
import { userModal } from '../model/Entities/userModal';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userModal:userModal
  constructor(
  private userService: UserService,
  private localService:LocalStorageService
  ){
    const userId=this.localService.getItem("Token").userId
    this.userService.getByIdUser(userId).subscribe(response => this.userModal = response)
  }

}
