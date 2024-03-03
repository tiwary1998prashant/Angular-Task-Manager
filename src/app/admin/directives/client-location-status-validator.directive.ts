import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ClientLocationStatusValidatorDirective,
      multi: true,
    },
  ],
})
export class ClientLocationStatusValidatorDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    var isValid = true;

    if (
      control.value.newClientLocation == 1 &&
      control.value.newProjectStatus == 'Support'
    ) {
      isValid = false;
    }
    if (isValid == true)
    {
      return null; //valid
    }
    else
    {
      return { clientLocationStatus: { valid: false }}; //invalid
    }
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}
