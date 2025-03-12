import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { cities, City } from './cities';

@Component({
  selector: 'app-location-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModalComponent,
  ],
  templateUrl: './location-selector.component.html',
  styleUrl: './location-selector.component.scss',
})
export class LocationSelectorComponent {
  @Input() formGroup!: FormGroup;

  @Output() originChange = new EventEmitter<string>();
  @Output() destinationChange = new EventEmitter<string>();
  @Output() departureDateChange = new EventEmitter<Date>();
  @Output() returnDateChange = new EventEmitter<Date>();

  showCalendarModal = false;
  selectedDates: string = '';
  datePipe = new DatePipe('es-ES');

  filteredCities: City[] = [];
  showCityList = false;
  activeField: 'origin' | 'destination' | null = null;

  filterCities(event: any, field: 'origin' | 'destination') {
    this.activeField = field;
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    
    this.filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  selectCity(field: string, city: City) {
    this.formGroup.patchValue({
      [field]: { name: city.name, abbreviation: city.abbreviation, airport: city.airport }
    });
    this.filteredCities = [];
    this.showCityList = false;
  }

  swapLocations() {
    const origin = this.formGroup.get('origin')?.value;
    const destination = this.formGroup.get('destination')?.value;

    this.formGroup.patchValue({
      origin: destination,
      destination: origin,
    });

    this.originChange.emit(destination);
    this.destinationChange.emit(origin);
  }

  openCalendarModal() {
    this.showCalendarModal = true;
  }

  closeCalendarModal() {
    this.showCalendarModal = false;
  }

  onDatesSelected(dates: { departure: Date; return: Date }) {
    this.departureDateChange.emit(dates.departure);
    this.returnDateChange.emit(dates.return);
    this.selectedDates = `${this.datePipe.transform(
      dates.departure,
      'EEE, d MMM'
    )} - ${this.datePipe.transform(dates.return, 'EEE, d MMM')}`;
    this.showCalendarModal = false;
  }

  isFieldInvalid(field: string): boolean | undefined{
    return this.formGroup.get(`${field}.name`)?.invalid && this.formGroup.get(`${field}.name`)?.touched;
  }
}
