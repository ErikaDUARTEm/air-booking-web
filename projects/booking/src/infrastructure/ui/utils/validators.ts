import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ageValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDateDay = control.get('birthDateDay')?.value;
    const birthDateMonth = control.get('birthDateMonth')?.value;
    const birthDateYear = control.get('birthDateYear')?.value;

    if (!birthDateDay || !birthDateMonth || !birthDateYear) {
      return null; 
    }

    const birthDate = new Date(birthDateYear, birthDateMonth - 1, birthDateDay);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--; 
    }

    if (age < minAge || age > maxAge) {
      return { ageRange: true }; 
    }

    return null; 
  };
}