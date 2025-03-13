import { Routes } from "@angular/router";
import { ReservationLayoutComponent } from "../layouts/reservation-layout/reservation-layout.component";
import { PaymentMethodContainerComponent } from "../containers/payment-method-container/payment-method-container.component";
import { PassangerContainerComponent } from "../containers/passanger-container/passanger-container.component";
import { FormLayoutComponent } from "../layouts/form-layout/form-layout.component";
import { SeatsPageComponent } from "../containers/seats-page-container/seats-page/seats-page.component";

export const bookingRoutes: Routes = [
  {
    path: '',
    component: ReservationLayoutComponent,
    children: [
      {
        path: 'payment',
        component: FormLayoutComponent,
        children: [
          {
            path: '',
            component: PaymentMethodContainerComponent,
          },
        ],
      },

      {
        path: 'seats',
        component: SeatsPageComponent,
      },

      {
        path: 'passanger',
        component: FormLayoutComponent,
        children: [
          {
            path: '',
            component: PassangerContainerComponent,
          },
        ],
      },
    ],
  },
];
