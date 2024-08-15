import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
 isActive:boolean;
  isLogin:boolean = false;
  userName:string;
  isAdmin:boolean = false;
 
  constructor( private localService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ){

  
    
  }
  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe(status => {
      this.isLogin = status;
  
      const token = this.localService.getItem("Token");
      if (token) {
        this.isAdmin = token.isAdmin;
      } else {
        this.isAdmin = false;
      }
    });
  
    const token = this.localService.getItem("Token");
    if (token && token.userId) {
      this.userService.getByIdUser(token.userId).subscribe(data => this.userName = data.name);
    }
  }
  
  logOut(){
    this.localService.removeItem("Token")
    this.router.navigate(["/login"]);
    this.authService.logout();
  }



}
