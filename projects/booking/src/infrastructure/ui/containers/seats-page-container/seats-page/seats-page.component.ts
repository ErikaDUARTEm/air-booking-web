import { IFlight } from './../../../../../domain/model/seats.model';
import { FlightSeatsService } from '../../../../services/services/seats.service';
import { Router } from '@angular/router'; // Importa el Router para la redirección

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarContentComponent } from './../navbar-content/navbar-content.component';
import { SectionSeatsContentComponent } from './../seats-content/section-seats-content.component';
import { SeatsFooterContentComponent } from "../seats-footer-content/seats-footer-content.component";
import { SeatsDetailsContentComponent } from "../seats-details-content/seats-details-content.component";
import { SeatsModalContentComponent } from "../seats-modal-content/seats-modal-content.component";

@Component({
  selector: 'lib-seats-page',
  imports: [CommonModule, NavbarContentComponent, SectionSeatsContentComponent, SeatsFooterContentComponent, SeatsDetailsContentComponent, SeatsModalContentComponent],
  templateUrl: './seats-page.component.html',
  styleUrls: ['./seats-page.component.scss']
})
export class SeatsPageComponent implements OnInit {
 
  modalOpen = false;
  selectedSeat = '';
  currentFlightType: 'outbound' | 'return' = 'outbound';
  flight: { outbound: IFlight | null, return: IFlight | null } = { outbound: null, return: null };
  isRoundTrip = true; // Asume que el usuario ha seleccionado un vuelo de ida y vuelta por defecto
  
  constructor(private flightSeatsService: FlightSeatsService, private router: Router) {} // Inyecta el Router
  
  ngOnInit(): void {
    this.flightSeatsService.getOutboundFlight().subscribe(flight => {
      this.flight.outbound = flight;
    });

    this.flightSeatsService.getReturnFlight().subscribe(flight => {
      this.flight.return = flight;
    });

    this.flightSeatsService.loadFlightData('FL123');

    if (!this.flight.return) {
      this.isRoundTrip = false;
    }
  }

  
  openModal(seat: { flightType: 'outbound' | 'return'; seatId: string; }): void {
    const { flightType, seatId } = seat;
    this.selectedSeat = seatId;
    this.currentFlightType = flightType;  
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  confirmSeatSelection(): void {
    const success = this.flightSeatsService.selectSeat(this.currentFlightType, this.selectedSeat);
    if (success) {
      console.log(`Asiento ${this.selectedSeat} confirmado`);
    } else {
      console.error(`No se pudo asignar el asiento ${this.selectedSeat}`);
    }
    this.closeModal();
  }

  cancelSeatSelection(): void {
    console.log(`Selección de asiento ${this.selectedSeat} cancelada`);
    this.closeModal();
  }

  nextPassenger(): void {
    const passenger = this.flightSeatsService.nextPassenger();
    if (passenger) {
      console.log(`Cambiado a pasajero: ${passenger.name}`);
    } else {
      console.log('No hay más pasajeros');
    }
  }

  previousPassenger(): void {
    const passenger = this.flightSeatsService.previousPassenger();
    if (passenger) {
      console.log(`Cambiado a pasajero: ${passenger.name}`);
    } else {
      console.log('Este es el primer pasajero');
    }
  }

  handleNextFlightRequest(): void {
    if (this.isRoundTrip) {
      if (this.currentFlightType === 'outbound') {
        this.currentFlightType = 'return';
        console.log(`Flight type changed to ${this.currentFlightType}`);
        console.log(this.flight)
      } else {
        this.router.navigate(['/booking/payment']);
        console.log(this.flight)
      }
    } else {
      this.router.navigate(['/booking/payment']);
      console.log(this.flight)
    }
  }
}