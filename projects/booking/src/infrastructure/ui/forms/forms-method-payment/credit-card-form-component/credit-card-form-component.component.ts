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
  public years: number[] = [];

  public ngOnInit(): void {
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    this.years.push(currentYear + i);
  }
}
  public cardForm = this.formBuilder.group({
    holderName: ['', [Validators.required]],
    number: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expirationMonth: ['1', [Validators.required]],
    expirationYear: ['1', [Validators.required]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    countryIssue: ['', [Validators.required]],
  });

  onInputChange(): void {
    const isValid = this.cardForm.valid;
    const formData = {
      ...this.cardForm.value,
      expirationDate: `${this.cardForm.get('expirationMonth')?.value}/${this.cardForm.get('expirationYear')?.value}` // Combina mes y año
    };

    delete formData.expirationMonth;
    delete formData.expirationYear;

    this.onFormValidityChange.emit({ isValid, formData });
  }
  resetForm(): void {
    this.cardForm.reset({
      holderName: "",
      number:"",
      expirationMonth: '',
      expirationYear: '',
      cvv:"",
      countryIssue:""
    });
    this.cardForm.patchValue({});
  }
  public months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];
}
