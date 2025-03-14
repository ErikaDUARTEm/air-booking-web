import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import {
  IFlight,
  IFlightInfo,
  IFlightRequest,
  IFlightUpdate,
  mapFlightToRequest,
} from '../../../../domain/model/flight.model';
import { AdminHeaderComponent, ModalComponent } from 'shared';
import { CreateFlightComponent } from '../../forms/create-flight/create-flight.component';
import { UpdateFlightComponent } from '../../forms/update-flight/update-flight.component';
import { IRoute } from '../../../../domain/model/route.model';
import { RouteIdFormatPipe } from '../../pipes/routeId.pipe';
import { FixDatePipe } from '../../pipes/fixDate.pipe';

@Component({
  selector: 'lib-table-flight',
  imports: [
    CurrencyPipe,
    DatePipe,
    ModalComponent,
    CreateFlightComponent,
    UpdateFlightComponent,
    AdminHeaderComponent,
    RouteIdFormatPipe,
    FixDatePipe
  ],
  templateUrl: './table-flight.component.html',
  styleUrl: './table-flight.component.scss',
})
export class TableFlightComponent {
  images = [
    'admin/form-svgrepo-com.svg#icon-delete',
    'admin/form-svgrepo-com.svg#icon-update',
  ];
  public columns: string[] = [
    '#Vuelo',
    'Modelo',
    'Ruta',
    'Fecha de Salida',
    'Fecha de LLegada',
    'Estado',
    'Precio',
    'BF',
    'BB',
    'EF',
    'EC',
    'EB',
  ];

  public dataFlight = input.required<IFlight[]>();
  public dataRoute = input<IRoute[]>();
  public deleteClient = output<string>();
  public flightRequests: IFlightInfo[] = [];
  public flightCurrent: IFlight;
  public currentFlight = input<IFlight>();
  public onSelectOrder = output<string>();

  @Output() removedFlight = new EventEmitter<string>();
  @Output() createdFlight = new EventEmitter<IFlightRequest>();
  @Output() updatedFlight = new EventEmitter<IFlightUpdate>();

  @ViewChild(CreateFlightComponent)
  createFlightComponent!: CreateFlightComponent;
  @ViewChild(UpdateFlightComponent)
  updateFlightComponent!: UpdateFlightComponent;

  public sent: boolean = true;
  public createOrderData = output<IFlightRequest>();

  get columnKeys(): string[] {
    if (this.dataFlight) {
      this.flightRequests = this.mapFlightsToRequests(this.dataFlight());
    }
    return this.flightRequests.length > 0
      ? Object.keys(this.flightRequests[0])
      : [];
  }
  mapFlightsToRequests(flights: IFlight[]): IFlightInfo[] {
    return flights.map(mapFlightToRequest);
  }
  removeFlight(flightId: string) {
    const flight = this.findFlight(flightId);
    this.removedFlight.emit(flight.flightId);
  }
  createFlights(flight: IFlightRequest) {
    this.createdFlight.emit(flight);
  }
  onUpdateFlight(flight: IFlightUpdate) {
    this.updatedFlight.emit(flight);
  }

  sendData(flightNumber: string) {
    if (this.sent) {
      this.flightCurrent = this.findFlight(flightNumber);
      this.onSelectOrder.emit(this.flightCurrent.flightId);
      console.log(this.currentFlight());
    }
  }
  confirma() {
    if (this.createFlightComponent) {
      this.createFlightComponent.submit();
    }
  }
  confirmUpdate() {
    if (this.updateFlightComponent) {
      this.updateFlightComponent.submit();
    }
  }
  cancel() {
    this.sent = false;
    console.log('cancel');
  }

  findFlight(flightNumber: string): IFlight | null {
    return this.dataFlight().find(
      (flight) => flight.flightNumber === flightNumber
    );
  }
}
