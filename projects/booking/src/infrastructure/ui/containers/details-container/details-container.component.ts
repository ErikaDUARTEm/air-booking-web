import { Component, inject, OnInit } from '@angular/core';
import { GetFlightDetailsUseCase } from '../../../../application/booking/get-fly-details.usecase';
import { Observable } from 'rxjs';
import { IFlightData } from '../../../../domain/model/passenger.model';
import { FlyDetailsComponent } from '../../components/fly-details/fly-details.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-details-container',
  imports: [FlyDetailsComponent, AsyncPipe],
  templateUrl: './details-container.component.html',
})
export class DetailsContainerComponent implements OnInit {
  private readonly getFlightDetailsUseCase  = inject(GetFlightDetailsUseCase);
  public flightData$!: Observable<IFlightData>;

  ngOnInit() {
    this.flightData$ = this.getFlightDetailsUseCase.flightData$();
  }
}
