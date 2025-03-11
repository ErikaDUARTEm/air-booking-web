import { BookingSeatsModalComponent } from './../../../components/seats-page-components/booking-seats-modal/booking-seats-modal.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'lib-seats-modal-content',
  imports: [CommonModule, BookingSeatsModalComponent],
  templateUrl: './seats-modal-content.component.html',
  styleUrl: './seats-modal-content.component.scss'
})
export class SeatsModalContentComponent {

  @Input() isOpen: boolean = true;
  @Input() seatInfo: string = 'A1';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  
  handleConfirm(): void {
    this.confirm.emit();
  }
  
  handleCancel(): void {
    this.cancel.emit();
  }
  
  handleClose(): void {
    this.close.emit();
  }

}
