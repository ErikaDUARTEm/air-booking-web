import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [DatePipe, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();

  currentMonth: Date = new Date();
  weeks: Date[][] = [];
  selectedDepartureDate: Date | null = null;
  selectedReturnDate: Date | null = null;
  today: Date = new Date();

  ngOnInit() {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.generateCalendar(this.currentMonth);
  }

  generateCalendar(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      currentWeek.push(new Date(currentDate));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.weeks = weeks;
  }

  onDateClick(date: Date) {
    if (date.getTime() < this.today.getTime()) {
      return;
    }

    if (
      !this.selectedDepartureDate ||
      (this.selectedDepartureDate && this.selectedReturnDate)
    ) {
      this.selectedDepartureDate = date;
      this.selectedReturnDate = null;
    } else if (!this.selectedReturnDate) {
      this.selectedReturnDate = date;
      if (this.selectedDepartureDate > this.selectedReturnDate) {
        [this.selectedDepartureDate, this.selectedReturnDate] = [
          this.selectedReturnDate,
          this.selectedDepartureDate,
        ];
      }
    }
    this.dateSelected.emit(date);
  }

  prevMonth() {
    const previousMonth = new Date(this.currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    if (previousMonth >= this.today) {
      this.currentMonth = previousMonth;
      this.generateCalendar(this.currentMonth);
    }
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1)
    );
    this.generateCalendar(this.currentMonth);
  }

  isBetweenDates(date: Date): boolean {
    if (this.selectedDepartureDate && this.selectedReturnDate) {
      return (
        date > this.selectedDepartureDate && date < this.selectedReturnDate
      );
    }
    return false;
  }

  isDisabled(date: Date): boolean {
    return date.getTime() < this.today.getTime();
  }
}
