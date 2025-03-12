import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-passenger-modal',
  imports: [CommonModule],
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss'],
})
export class PassengerModalComponent {
  @Input() adults = 1;
  @Input() children = 0;
  @Input() infants = 0;
  totalPersons = this.adults + this.children + this.infants;

  @Output() passengersSelected = new EventEmitter<{
    adults: number;
    children: number;
    infants: number;
  }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  incrementAdults() {
    if (this.totalPersons < 8) {
      this.adults++;
      this.totalPersons++;
    }
  }

  decrementAdults() {
    if (this.adults > 1) {
      this.adults--;
      this.totalPersons--;
    }
  }

  incrementChildren() {
    if(this.totalPersons < 8) {
      this.children++;
      this.totalPersons++;
    }
  }

  decrementChildren() {
    if (this.children > 0) {
      this.children--;
      this.totalPersons--;
    }
  }

  incrementInfants() {
    if (this.totalPersons < 8) {
      this.infants++;
      this.totalPersons++;
    }
  }

  decrementInfants() {
    if (this.infants > 0) {
      this.infants--;
      this.totalPersons--;
    }
  }

  save() {
    this.passengersSelected.emit({
      adults: this.adults,
      children: this.children,
      infants: this.infants,
    });
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
