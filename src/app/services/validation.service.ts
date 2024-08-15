import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  private config: { [key: string]: string } = {
    'required': 'Bu alan zorunludur.',
    'username': 'Kullanıcı adı 3-20 karakter arasında olmalıdır.',
    'name': 'İsim 3-200 karakter arasında olmalıdır.',
    'email': 'Geçerli bir email adresi giriniz.',
    'age': 'Yaş 1 ile 150 arasında olmalıdır.',
    'phone': 'Numara yalnızca rakamlardan oluşmalıdır ve 11-13 karakter uzunluğunda olmalıdır.',
    'password': 'Şifre 6-20 karakter arasında olmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.',
    'description': 'Açıklama 15-600 karakter arasında olmalıdır.',
    'baseChildPrice': 'Fiyat 1 ile 999999999 arasında olmalıdır..',
    'baseAdultPrice': 'Fiyat 1 ile 999999999 arasında olmalıdır..',
    'cardholderName' : 'Lütfen geçerli bir isim giriniz.',
    'creditCardNumber': 'Geçerli bir kredi kartı numarası giriniz.',
    'creditCardExpiration': 'Geçerli bir son kullanma tarihi giriniz (MM/YY).',
    'creditCardCVV': 'Geçerli bir CVV numarası giriniz (3-4 haneli).',
    'address': 'Adres 15-600 karakter arasında olmalıdır. ',
  
  };
  getValidatorErrorMessage(validatorName: string): string {
    return this.config[validatorName] || 'Geçersiz doğrulama hatası.';
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /^[0-9]{10,13}$/.test(control.value);
       return isValid ? null : { 'phone': true };
    };
  }

  static starValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
       return (value >= 1 && value <= 7) ? null : { 'star': true };
    };
  }

  static urlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
      return urlPattern.test(control.value) ? null : { 'url': true };
    };
  }

  static ageValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const age = control.value;
      const isValid = age >= 1 && age <= 150;
      return isValid ? null : { 'age': true };
    };
  }
  static childPriceValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const baseChildPrice = control.value;
      const isValid = baseChildPrice >= 1 && baseChildPrice <= 999999999;
      return isValid ? null : { 'baseChildPrice': true };
    };
  }
  static adultPriceValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const baseChildPrice = control.value;
      const isValid = baseChildPrice >= 1 && baseChildPrice <= 999999999;
      return isValid ? null : { 'baseAdultPrice': true };
    };
  }



// Email doğrulaması
static emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);
    return isValid ? null : { 'email': true };
  };
}

// İsim doğrulaması (3-200 karakter arasında)
static nameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value && control.value.length >= 3 && control.value.length <= 200;
    return isValid ? null : { 'name': true };
  };
}

// Şifre doğrulaması (6-20 karakter, en az bir büyük harf, bir küçük harf ve bir rakam)
static passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(control.value);
    return isValid ? null : { 'password': true };
  };
}

// Kullanıcı adı doğrulaması (3-20 karakter arasında)
static usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value && control.value.length >= 3 && control.value.length <= 20;
    return isValid ? null : { 'username': true };
  };
}

// Açıklama doğrulaması (15-600 karakter arasında)
static descriptionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value && control.value.length >= 15 && control.value.length <= 600;
    return isValid ? null : { 'description': true };
  };
}

// Açıklama doğrulaması (15-600 karakter arasında)
static addressValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value && control.value.length >= 15 && control.value.length <= 600;
    return isValid ? null : { 'address': true };
  };
}

static cardholderNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value && control.value.length >= 3 && control.value.length <= 100;
    return isValid ? null : { 'cardHolderName': true };
  };
}


static creditCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d{16}$/.test(control.value); // 16 haneli rakam
    return isValid ? null : { 'creditCardNumber': true };
  };
}

static creditCardCVVValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d{3,3}$/.test(control.value); // 3-4 haneli rakam
    return isValid ? null : { 'creditCardCVV': true };
  };
}

}
