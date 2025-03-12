import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripOptionsComponent } from '../../components/trip-options/trip-options.component';
import { LocationSelectorComponent } from '../../components/location-selector/location-selector.component';
import { Router } from '@angular/router';
import { IFormFlight } from '../../../../domain/model/flight.model';

@Component({
  selector: 'lib-search-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TripOptionsComponent,
    LocationSelectorComponent,
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  flightForm: FormGroup;
  errorMessage: string = '';

  @Output() formSubmit = new EventEmitter<IFormFlight>();

  constructor(private fb: FormBuilder, private router: Router) {}
  
  ngOnInit() {
    this.flightForm = this.fb.group({
      passengers: this.fb.group({
        adults: [1, Validators.required],
        children: [0],
        infants: [0],
      }),
      origin: this.fb.group({
        name: ['', Validators.required],
        abbreviation: [''],
        airport: [''],
      }),
      destination: this.fb.group({
        name: ['', Validators.required],
        abbreviation: [''],
        airport: [''],
      }),
      dates: this.fb.group({
        departure: [null, Validators.required],
        return: [null, Validators.required],
      }),
    });

    this.flightForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.errorMessage = ''; 
      const formData = this.flightForm.value as IFormFlight;
      this.formSubmit.emit(formData);
      this.router.navigate(['/flight-selection']);
    } else {
      this.errorMessage = '❗El formulario no es válido. Completa todos los campos.';
    }
  }

  updateOrigin(newOrigin: string) {
    this.flightForm.patchValue({
      origin: { name: newOrigin }
    });
  }

  updateDestination(newDestination: string) {
    this.flightForm.patchValue({
      destination: { name: newDestination }
    });
  }

  updateDates(newDeparture: Date, newReturnDate: Date) {
    this.flightForm.patchValue({
      dates: {
        departure: newDeparture,
        return: newReturnDate,
      },
    });
  }

  updatePassengers(newAdults: number, newChildren: number, newInfants: number) {
    this.flightForm.patchValue({
      passengers: {
        adults: newAdults,
        children: newChildren,
        infants: newInfants,
      },
    });
  }
}
