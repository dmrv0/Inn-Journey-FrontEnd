import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from '../../services/validation.service';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public errorMessage: string = ""
  public signUpForm: FormGroup
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {

    this.signUpForm = this.fb.group({
      name: ['', [ValidationService.nameValidator()]],
      userName: ['', [ValidationService.usernameValidator()]],
      email: ['', [ValidationService.emailValidator()]],
      age: ['', [ValidationService.ageValidator()]],
      phone: ['', [ValidationService.phoneValidator()]],
      gender: [false],
      password: ['', [ValidationService.passwordValidator()]],
      confirmPassword: [''],
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmPassword').value;
        var a = pass == confirmPass && confirmPass == pass ? null : { notSame: true };
        return a;
      }
    })
  }


  submitRegister() {
    if (this.signUpForm.valid) {
      var user = this.signUpForm.value
      user.phone = "0"+user.phone;
      user.age = user.age + ""

      this.userService.createUser(this.signUpForm.value).subscribe((resp) => {

        if (!!resp) {
          this._snackBar.open('Başarıyla kayıt oldun', '', { duration: 4000 });
          this.router.navigate(["login"]);
        }
      },
        (error) => {

          console.error('SignUp failed:', error);
          this.errorMessage = 'Kayıt olurken bir hata oluştu. Hata Mesajı:' + error.message;

        }
      );

    }
  }

}
