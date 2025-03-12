import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlight, IPassenger } from './../../../../../domain/model/seats.model';

@Component({
  selector: 'lib-section-booking-seats',
  imports: [CommonModule],
  templateUrl: './section-booking-seats.component.html',
  styleUrls: ['./section-booking-seats.component.scss']
})
export class SectionBookingSeatsComponent {
  @Input() flight!: { outbound: IFlight, return: IFlight };
  @Input() passengers: IPassenger[] = [];
  @Input() currentPassenger!: IPassenger;
  @Input() bussinessRows: number[] = [];
  @Input() premiumRows: number[] = [];
  @Input() emergencyRows: number[] = [];
  @Input() favorableRows: number[] = [];
  @Input() regularRows: number[] = [];
  @Input() leftTwoCols: string[] = [];
  @Input() rightTwoCols: string[] = [];

  @Input() leftCols: string[] = [];
  @Input() rightCols: string[] = [];

  @Input() seatClasses: {[key: string]: string} = {};
  @Input() seatAvailability: {[key: string]: boolean} = {};
  @Input() seatPrices: {[key: string]: number} = {};
  @Input() selectedSeats: {[key: string]: boolean} = {};

  @Output() seatClicked = new EventEmitter<{row: number, col: string}>();
  @Output() nextPassengerRequested = new EventEmitter<void>();
  @Output() previousPassengerRequested = new EventEmitter<void>();

  onSeatClick(row: number, col: string): void {
    this.seatClicked.emit({row, col});
  }

  onNextPassenger(): void {
    this.nextPassengerRequested.emit();
  }

  onPreviousPassenger(): void {
    this.previousPassengerRequested.emit();
  }
}