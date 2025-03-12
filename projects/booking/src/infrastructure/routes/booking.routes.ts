import { Routes } from "@angular/router";
import { ReservationLayoutComponent } from "../ui/layouts/reservation-layout/reservation-layout.component";
import { PaymentMethodContainerComponent } from "../ui/containers/payment-method-container/payment-method-container.component";
import { SeatsPageComponent } from "../ui/containers/seats-page-container/seats-page/seats-page.component";

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
