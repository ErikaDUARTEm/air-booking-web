import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlyDetailsComponent } from '../../components/fly-details/fly-details.component';
import { AsyncPipe } from '@angular/common';
import { FormUseCase, GetFlightsUsecase, IFlightSelected, IFormFlight } from 'availability';

@Component({
  selector: 'lib-details-container',
  imports: [FlyDetailsComponent, AsyncPipe],
  templateUrl: './details-container.component.html',
})
export class DetailsContainerComponent implements OnInit {
  private readonly getFlightDetailsUseCase  = inject(GetFlightsUsecase);
  private readonly getPassengerDetailsUseCase = inject(FormUseCase);
  public flightOriginData$!: Observable<IFlightSelected>;
  public flightDestinationData$!: Observable<IFlightSelected>;
  public passangerFlightData$!: Observable<IFormFlight>;

  ngOnInit() {
    this.flightOriginData$ = this.getFlightDetailsUseCase.flightOriginSelected$();
    this.flightDestinationData$ = this.getFlightDetailsUseCase.flightDestinationSelected$();
    this.passangerFlightData$ = this.getPassengerDetailsUseCase.form$();
  }
}
