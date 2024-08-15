import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl;
 
  constructor(private validationService: ValidationService) { }
  getErrorMessage(errorKey: string): string {
    return this.validationService.getValidatorErrorMessage(errorKey);

  }
}
