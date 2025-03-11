import { NavbarContentComponent } from './../navbar-content/navbar-content.component';
import { SectionSeatsContentComponent } from './../seats-content/section-seats-content.component';

import { Component } from '@angular/core';
import { SeatsFooterContentComponent } from "../seats-footer-content/seats-footer-content.component";
import { SeatsDetailsContentComponent } from "../seats-details-content/seats-details-content.component";
import { SeatsModalContentComponent } from "../seats-modal-content/seats-modal-content.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-seats-page',
  imports: [CommonModule,NavbarContentComponent, SectionSeatsContentComponent, SeatsFooterContentComponent, SeatsDetailsContentComponent, SeatsModalContentComponent],
  templateUrl: './seats-page.component.html',
  styleUrl: './seats-page.component.scss'
})
export class SeatsPageComponent {
  
  modalOpen = false;
  selectedSeat = '';

  openModal(seatId: string): void {
    this.selectedSeat = seatId;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  confirmSeatSelection(): void {
    // Lógica para confirmar la selección
    console.log(`Asiento ${this.selectedSeat} confirmado`);
    this.closeModal();
  }

  cancelSeatSelection(): void {
    // Lógica para cancelar la selección
    console.log(`Selección de asiento ${this.selectedSeat} cancelada`);
    this.closeModal();
  }

}
