import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripOptionsComponent } from '../../components/trip-options/trip-options.component';
import { LocationSelectorComponent } from '../../components/location-selector/location-selector.component';

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
export class SearchFormComponent {
  flightForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.flightForm = this.fb.group({
      passengers: this.fb.group({
        adults: [1, Validators.required],
        children: [0],
        infants: [0],
      }),
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      dates: this.fb.group({
        departure: [null, Validators.required],
        return: [null, Validators.required],
      }),
    });
  }
  onSubmit() {
    console.log(this.flightForm.value);
  }

  updateOrigin(newOrigin: string) {
    this.flightForm.patchValue({ origin: newOrigin });
  }

  updateDestination(newDestination: string) {
    this.flightForm.patchValue({ destination: newDestination });
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
