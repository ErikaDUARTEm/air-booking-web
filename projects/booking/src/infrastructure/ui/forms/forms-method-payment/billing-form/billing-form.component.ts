import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-billing-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './billing-form.component.html',
  styleUrl: './billing-form.component.scss'
})
export class BillingFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  @Output() onFormValidityChange = new EventEmitter<{ isValid: boolean, formData: any }>();

    public billingForm = this.formBuilder.group({
        id: [null],
        addressOne: ["", Validators.required],
        addressTwo: [''],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: [''],
        phoneCode: ['+57', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
        email: ['', Validators.email],
    });

    onInputChange(): void {

      const isValid = this.billingForm.valid;
      const formData = {
        ...this.billingForm.value,
        phone: `${this.billingForm.get('phoneCode')?.value} ${this.billingForm.get('phoneNumber')?.value}`
      };
      this.onFormValidityChange.emit({ isValid, formData });
    }
    resetForm(): void {
      this.billingForm.reset();
      console.log('Formulario de billing reiniciado');
    }

}
