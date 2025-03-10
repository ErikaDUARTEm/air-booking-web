import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss'],
})
export class PassengerModalComponent {
  @Input() adults = 1;
  @Input() children = 0;
  @Input() infants = 0;

  @Output() passengersSelected = new EventEmitter<{
    adults: number;
    children: number;
    infants: number;
  }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  incrementAdults() {
    this.adults++;
  }

  decrementAdults() {
    if (this.adults > 1) {
      this.adults--;
    }
  }

  incrementChildren() {
    this.children++;
  }

  decrementChildren() {
    if (this.children > 0) {
      this.children--;
    }
  }

  incrementInfants() {
    this.infants++;
  }

  decrementInfants() {
    if (this.infants > 0) {
      this.infants--;
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
