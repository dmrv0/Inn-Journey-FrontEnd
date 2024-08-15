import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { userModal } from '../../model/Entities/userModal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-chance-pass',
  templateUrl: './chance-pass.component.html',
  styleUrl: './chance-pass.component.scss'
})
export class ChangePassComponent implements OnInit{
  
  userForm: FormGroup;
  userId:string;
  userModal:userModal
  errorMessage:string
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private localService:LocalStorageService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      id: [this.userId, Validators.required], // userId değeri burada atanıyor
      username: ['', [Validators.required, ValidationService.usernameValidator()]],
      name: ['', [Validators.required, ValidationService.nameValidator()]],
      email: ['', [Validators.required, ValidationService.emailValidator()]],
      age:  [null, [Validators.required, ValidationService.ageValidator()]],
      phone: ['', [Validators.required, ValidationService.phoneValidator()]],
      gender: [false, Validators.required],
      password: ['', [Validators.required,ValidationService.passwordValidator()]],
      confirmPassword: ['', [Validators.required,ValidationService.passwordValidator()]],
    });
    this.userId = this.localService.getItem("Token").userId
    this.userService.getByIdUser(this.userId).subscribe(response=> {
      this.initializeForm()
      this.userModal=response;
      this.updateForm()// Formun yeniden yüklenmesini sağlayacak metot
    });
  
  }

  updateForm(): void {
    this.userForm.patchValue({
      id: this.userModal.id ?? '',
      username: this.userModal.userName ?? '',
      name: this.userModal.name ?? '', // Null kontrolü ve boş string atama
      email: this.userModal.email ?? '',
      phone: this.userModal.phone ?? '',
      
      age: this.userModal.age ?? '',
      gender: this.userModal.gender ?? null, // Star için null bırakıyoruz
      password: '', // Star için null bırakıyoruz
      confirmPassword: '' , // Star için null bırakıyoruz
    });
  }


  initializeForm() {
 
  }
  submitForm(){
    console.log(this.userForm.value)
   
      
      this.userService.updateUser(this.userForm.value).subscribe((resp:any)=> { 

    if(resp.isUpdated == true)
       {  this._snackBar.open( 'Başarıyla Güncelleme Yapıldı.','',{ duration:4000 });}
  
    },
    (error) => {
      debugger;
      console.error('Login failed:', error);
      this.errorMessage = 'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin. Hata Mesajı:' + error;
      // Hata durumunda kullanıcıya bildirim gösterebilirsiniz
    }
  );
    

  }

}


