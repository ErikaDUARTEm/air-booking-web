import { SeatsFooterComponent } from './../../../components/seats-page-components/seats-footer/seats-footer.component';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-seats-footer-content',
  imports: [SeatsFooterComponent],
  templateUrl: './seats-footer-content.component.html',
  styleUrl: './seats-footer-content.component.scss'
})
export class SeatsFooterContentComponent {
  @Output() nextFlightRequested = new EventEmitter<void>();

  handleNextFlightRequest(): void {
    this.nextFlightRequested.emit();
    console.log('Next flight requested');
  }


}