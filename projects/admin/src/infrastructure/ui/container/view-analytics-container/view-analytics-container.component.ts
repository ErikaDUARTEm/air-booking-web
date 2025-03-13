import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ViewAnalyticsComponent } from "../../components/view-analytics/view-analytics.component";
import { GetReservationUseCase } from '../../../../application/get-reservations.usecase';
import { Observable } from 'rxjs';
import { IReservationData } from '../../../../domain/model/reservation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-view-analytics-container',
  imports: [ViewAnalyticsComponent, CommonModule],
  templateUrl: './view-analytics-container.component.html',
})
export class ViewAnalyticsContainerComponent implements OnInit, OnDestroy {

  private readonly _findAllBookingsUseCase = inject(GetReservationUseCase);

  bookings$ : Observable<IReservationData[]>;

  ngOnInit(): void {
    this._findAllBookingsUseCase.initSubscriptions();
    this._findAllBookingsUseCase.execute();
    this.bookings$ = this._findAllBookingsUseCase.allReservations$()
    console.log(this.bookings$);

  }
  ngOnDestroy(): void {
    this._findAllBookingsUseCase.destroySubscriptions();

  }



}
