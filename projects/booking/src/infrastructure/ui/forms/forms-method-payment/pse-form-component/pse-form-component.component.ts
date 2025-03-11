import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-pse-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pse-form-component.component.html',
  styleUrl: './pse-form-component.component.scss'
})
export class PseFormComponentComponent {
  private readonly formBuilder = inject(FormBuilder);
  @Output() onFormValidityChange = new EventEmitter<{ isValid: boolean; formData: any }>();

  public pseForm = this.formBuilder.group({
    holderName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  });

  onInputChange(): void {
    console.log('Estado del formulario de pse:', {
      holderName: this.pseForm.get('holderName')?.value,
      holderNameValid: this.pseForm.get('holderName')?.valid,
      email: this.pseForm.get('email')?.value,
      emailValid: this.pseForm.get('email')?.valid,
    })
    const isValid = this.pseForm.valid;
    const formData = {
      ...this.pseForm.value
    }
    this.onFormValidityChange.emit({ isValid, formData });
  }
  resetForm(): void {
    this.pseForm.reset();
    this.pseForm.patchValue({});
    console.log('Formulario de tarjeta reiniciado');
  }
}
