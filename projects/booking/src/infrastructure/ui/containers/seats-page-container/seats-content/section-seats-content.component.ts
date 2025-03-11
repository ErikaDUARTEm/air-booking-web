import { SectionBookingSeatsComponent } from './../../../components/seats-page-components/booking-seats/section-booking-seats.component';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-section-seats-content',
  imports: [SectionBookingSeatsComponent],
  templateUrl: './section-seats-content.component.html',
  styleUrl: './section-seats-content.component.scss'
})
export class SectionSeatsContentComponent {
  @Output() seatSelected = new EventEmitter<string>();
  
  onSeatSelected(seatId: string): void {
    this.seatSelected.emit(seatId);
  }

}
