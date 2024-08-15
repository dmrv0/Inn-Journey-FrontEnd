import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelComponent } from '../../hotels/hotel/hotel.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Hata mesajı değişkeni

  constructor(private authService:AuthService,
    private router:Router,
    private localService:LocalStorageService,
    private _snackBar: MatSnackBar
   
  ){}

  login() {

    this.authService.login(this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/hotels']);
          // Burada başarılı giriş işlemi sonrası yapılacak işlemleri ekleyebilirsiniz
          this.localService.setItem("Token", response.token)
          this.authService.emitLoginStatus(true);  // Login durumunu yayınla
       

        },
        (error) => {  
          this.errorMessage = "Kullanıcı adı veya şifre yanlış";
        
        }
      );
  }




}
