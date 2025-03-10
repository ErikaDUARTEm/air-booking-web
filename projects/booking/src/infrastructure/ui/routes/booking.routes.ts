import { Routes } from "@angular/router";
import { ReservationLayoutComponent } from "../layouts/reservation-layout/reservation-layout.component";
import { PaymentMethodContainerComponent } from "../containers/payment-method-container/payment-method-container.component";
import { SeatsPageComponent } from "../containers/seats-page-container/seats-page/seats-page.component";

export const bookingRoutes: Routes = [
  {
    path: '',
    component: ReservationLayoutComponent,
    children: [
      {
        path: 'payment',
        component: PaymentMethodContainerComponent
      },

      {
        path: '',
        component: SeatsPageComponent
      },
    ],
  },
];
