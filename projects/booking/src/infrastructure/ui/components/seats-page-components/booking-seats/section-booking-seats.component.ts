import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-section-booking-seats',
  imports: [CommonModule],
  templateUrl: './section-booking-seats.component.html',
  styleUrl: './section-booking-seats.component.scss'
})
export class SectionBookingSeatsComponent {
  @Output() seatSelected = new EventEmitter<string>();

  // Define rows and columns
  regularRows: number[] = [21, 22, 23, 24, 25, 26, 27, 28, 29];
  leftCols: string[] = ['A', 'B', 'C'];
  rightCols: string[] = ['D', 'E', 'F'];
  
  // Define unavailable seats
  unavailableSeats: string[] = [
    '21C', '23F', '25A', '26A', '26B', '27C', '28A'
  ];
  
  // Define premium seats
  premiumSeats: string[] = [
    '05A', '05B', '05C', '05D', '05E', '05F',
    '06A', '06B', '06C', '06D', '06E', '06F',
    '07A', '07B', '07C', '07D', '07E', '07F',
    '08A', '08B', '08C', '08D', '08E', '08F',
    '09A', '09B', '09C', '09D', '09E', '09F',
    '10A', '10B', '10C', '10D', '10E', '10F'
  ];
  
  // Define emergency exit seats
  emergencySeats: string[] = [
    '17A', '17B', '17C', '17D', '17E', '17F'
  ];
  
  // Define favorable seats
  favorableSeats: string[] = [
    '18A', '18B', '19A', '19F', '20A', '20B', '20E', '20F'
  ];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  // Check if a seat is available
  isSeatAvailable(row: number, col: string): boolean {
    const seatId = `${row}${col}`;
    return !this.unavailableSeats.includes(seatId);
  }
  
  // Get the appropriate class for a seat
  getSeatClass(row: number, col: string): string {
    const seatId = `${row < 10 ? '0' + row : row}${col}`;
    
    if (!this.isSeatAvailable(row, col)) {
      return 'main__seat--unavailable';
    } else if (this.premiumSeats.includes(seatId)) {
      return 'main__seat--premium';
    } else if (this.emergencySeats.includes(seatId)) {
      return 'main__seat--emergency';
    } else if (this.favorableSeats.includes(seatId)) {
      return 'main__seat--favorable';
    } else {
      return 'main__seat--regular';
    }
  }
  


  selectSeat(row: number, col: string): void {
    if (this.isSeatAvailable(row, col)) {
      const seatId = `${row}${col}`;
      console.log(`Selected seat: ${seatId}`);
      this.seatSelected.emit(seatId);
    }
  }

}
