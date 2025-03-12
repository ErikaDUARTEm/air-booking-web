import { CommonModule } from '@angular/common';
import { Component, Output, inject, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'lib-credit-card-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './credit-card-form-component.component.html',
  styleUrl: './credit-card-form-component.component.scss'
})
export class CreditCardFormComponentComponent {
  private readonly formBuilder = inject(FormBuilder);
  @Output() onFormValidityChange = new EventEmitter<{ isValid: boolean, formData: any }>();

  public cardForm = this.formBuilder.group({
    holderName: ['', [Validators.required]],
    number: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expirationDate: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    countryIssue: ['', [Validators.required]],
  });

  onInputChange(): void {
    const isValid = this.cardForm.valid;
    const formData = this.cardForm.value;
    this.onFormValidityChange.emit({ isValid, formData });
  }
  resetForm(): void {
    this.cardForm.reset({
      holderName: "",
      number:"",
      expirationDate:"",
      cvv:"",
      countryIssue:""
    });
    this.cardForm.patchValue({});
    console.log('Formulario de tarjeta reiniciado');
  }
}
