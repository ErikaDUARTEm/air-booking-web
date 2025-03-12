import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { IPassengerData, IPassenger } from '../../../../domain/model/passenger.model';
import { ageValidator } from '../../utils/validators';

@Component({
  selector: 'lib-passenger-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './passenger-form.component.html',
  styleUrl: './passenger-form.component.scss',
})
export class PassengerFormComponent implements OnChanges {
  private _fb = inject(FormBuilder);
  @Output() onSubmit = new EventEmitter<IPassenger[]>();

  @Input() passengerData: IPassengerData = {
    adult: 0,
    children: 0,
    infants: 0,
  };

  passengerForms: FormGroup[] = [];
  savedPassengers: IPassenger[] = []; 
  activeFormIndex = 0;
  
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];
  years = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i);
  countryCodes = [
    { code: '+1', name: 'Estados Unidos' },
    { code: '+52', name: 'México' },
    { code: '+57', name: 'Colombia' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['passengerData']) {
      this.passengerData = this.passengerData ?? { adult: 0, children: 0, infants: 0 };
      this.generateForms();
    }
  }

  generateForms(): void {
    this.passengerForms = [];
    this.savedPassengers = []; 
    for (let i = 0; i < (this.passengerData.adult || 0); i++) {
      this.addAdultForm();
    }
    for (let i = 0; i < (this.passengerData.children || 0); i++) {
      this.addChildForm();
    }
    for (let i = 0; i < (this.passengerData.infants || 0); i++) {
      this.addInfantForm();
    }
  }
  
  addAdultForm(): void {
    const form = this.createPassengerForm(true, 'adult');
    this.passengerForms.push(form);
  }
  
  addChildForm(): void {
    const form = this.createPassengerForm(true, 'child');
    this.passengerForms.push(form);
  }
  
  addInfantForm(): void {
    const form = this.createPassengerForm(false, 'infant');
    this.passengerForms.push(form);
  }

  createPassengerForm(includeContactInfo = true, passengerType: 'adult' | 'child' | 'infant' = 'adult'): FormGroup {
    const form = this._fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDateDay: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      birthDateMonth: [null, Validators.required],
      birthDateYear: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      gender: ['', Validators.required],
      ...(includeContactInfo && {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        countryCode: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      }),
      promotions: [false],
    });
  
    
    if (passengerType === 'adult') {
      form.setValidators(ageValidator(12, 120));
    } else if (passengerType === 'child') {
      form.setValidators(ageValidator(2, 11));
    } else if (passengerType === 'infant') {
      form.setValidators(ageValidator(0, 1)); 
    }
  
    return form;
  }

  getPassengerType(index: number): string {
    if (index < (this.passengerData.adult || 0)) {
      return 'Adulto (12 años en adelante)';
    } else if (index < (this.passengerData.adult || 0) + (this.passengerData.children || 0)) {
      return 'Niño (2 a 11 años)';
    } else {
      return 'Infante (menos de 2 años)';
    }
  }

  isLastForm(index: number): boolean {
    return index === this.passengerForms.length - 1;
  }
  
  areAllFormsValid(): boolean {
    return this.passengerForms.every(form => form.valid);
  }

  

  submit(): void {
    if (this.areAllFormsValid()) {
      const passengers = this.passengerForms.map(form => {
        const { birthDateDay, birthDateMonth, birthDateYear, countryCode, phoneNumber, ...rest } = form.value;
        const birthDate = `${birthDateYear}-${String(birthDateMonth).padStart(2, '0')}-${String(birthDateDay).padStart(2, '0')}`; 
        const phone = `${countryCode} ${phoneNumber}`;
        return { ...rest, birthDate, phone };
      });
  
      this.onSubmit.emit(passengers);
    } else {
      console.log('Por favor, completa todos los campos requeridos y corrige los errores.');
    }
  }
}
