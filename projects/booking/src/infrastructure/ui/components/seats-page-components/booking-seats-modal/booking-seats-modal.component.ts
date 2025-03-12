import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-booking-seats-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-seats-modal.component.html',
  styleUrl: './booking-seats-modal.component.scss'
})
export class BookingSeatsModalComponent {
  @Input() isOpen: boolean = false;
  @Input() seatInfo: string = '5A';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  
  onConfirm(): void {
    this.confirm.emit();
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
  
  onClose(): void {
    this.close.emit();
  }
}