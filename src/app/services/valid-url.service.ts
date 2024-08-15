import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidUrlService {

  constructor() { }

  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
      const isValid = urlPattern.test(control.value);
      return isValid ? null : { invalidUrl: true };
    };
  }
}
