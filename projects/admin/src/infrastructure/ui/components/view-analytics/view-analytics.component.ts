import { Component, effect, Input, signal } from '@angular/core';
import { AdminHeaderComponent } from 'shared';
import { AnaliticalCardComponent } from "../analitical-card/analitical-card.component";
import { AnaliticalCard } from '../../../../domain/model/analitical-card-model';
import { CommonModule } from '@angular/common';
import { IReservationData } from '../../../../domain/model/reservation.model';
import { CanvasCardComponent } from "../canvas-card/canvas-card.component";
import { ChartSeries } from '../../../../domain/model/chart-series-model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-view-analytics',
  imports: [AdminHeaderComponent, AnaliticalCardComponent, CommonModule, CanvasCardComponent],
  templateUrl: './view-analytics.component.html',
  styleUrl: './view-analytics.component.scss'
})
export class ViewAnalyticsComponent {

  private _bookings: IReservationData[] = [];
  @Input() set bookings (value: IReservationData[]){
    this._bookings = value;
    this.calculateTotals();
    this.updateCards();
  };

  total= signal<number>(0);
  totalTax = signal<number>(0);
  totalBookings= signal<number>(0);
  confirmed = signal<number>(0);
  canceled = signal<number>(0);
  pending = signal<number>(0);

  cards = signal<AnaliticalCard[]>([]);
  chartMetrics = new BehaviorSubject<ChartSeries>({} as ChartSeries);
  calculateTotals() {
    if (this.bookings) {
      this.totalBookings.set(this.bookings.length);
      this.total.set(this.bookings.reduce((sum, b) => sum + b.price, 0));
      this.totalTax.set(this.bookings.reduce((sum, b) => sum + b.tax, 0));
      this.defineStatus()
    }
  }

  defineStatus() {
    this.confirmed.set(0);
    this.canceled.set(0);
    this.pending.set(0);

    this.bookings.forEach((b) => {
      const status = b.status.toLowerCase();
      if (status === 'confirmed') {
        this.confirmed.update((value) => value + 1);
      } else if (status === 'cancelled') {
        this.canceled.update((value) => value + 1);
      } else if (status === 'pending') {
        this.pending.update((value) => value + 1);
      }
    });

    this.chartMetrics.next({
      confirmed: this.confirmed(),
      canceled: this.canceled(),
      pending: this.pending(),
      bookings: this.totalBookings()
    })
  }
  get bookings(): IReservationData[] {
    return this._bookings;
  }

  updateCards(){
    this.cards.set([
      {
        title: "reservas totales",
        value: this.totalBookings(),
        isCurrency: false,
        icon : `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeMedium svg-icon css-kry165" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InventoryIcon" tabindex="-1" title="Inventory" width="67" height="67"><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2m-5 12H9v-2h6zm5-7H4V4l16-.02z" fill="#0e68ff"></path></svg>`
      },
      {
        title: "Totales ingresos",
        value: this.total(),
        isCurrency: true,
        icon : `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeMedium svg-icon css-kry165" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachMoneyIcon" tabindex="-1" title="AttachMoney" width="67" height="67"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4" fill="#4caf50"></path></svg>`
      },
      {
        title: "impuestos recaudados",
        value: this.totalTax(),
        isCurrency: true,
        icon : `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeMedium svg-icon css-kry165" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocalAtmIcon" tabindex="-1" title="LocalAtm" width="67" height="67"><path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4V6h16z" fill="#4caf50"></path></svg>`
      }
    ]);
  }


}
