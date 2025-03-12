import { Component, EventEmitter, Output } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-modal',
  imports: [CalendarComponent],
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent {
  @Output() datesSelected = new EventEmitter<{
    departure: Date;
    return: Date;
  }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  selectedDepartureDate: Date | null = null;
  selectedReturnDate: Date | null = null;

   onDateSelected(date: Date) {
    if (!this.selectedDepartureDate) {
      this.selectedDepartureDate = date;
    } else if (!this.selectedReturnDate) {
      this.selectedReturnDate = date;
    }
  }

  onConfirmDates() {
    if (this.selectedDepartureDate && this.selectedReturnDate) {
      this.datesSelected.emit({
        departure: this.selectedDepartureDate,
        return: this.selectedReturnDate,
      });
      this.closeModal();
    } else {
      alert('Por favor, selecciona ambas fechas antes de guardar.');
    }
  }

  onClearDates() {
    this.selectedDepartureDate = null;
    this.selectedReturnDate = null;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
