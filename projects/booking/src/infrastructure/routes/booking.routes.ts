import { Routes } from "@angular/router";
import { ReservationLayoutComponent } from "../ui/layouts/reservation-layout/reservation-layout.component";
import { PaymentMethodContainerComponent } from "../ui/containers/payment-method-container/payment-method-container.component";
import { SeatsPageComponent } from "../ui/containers/seats-page-container/seats-page/seats-page.component";
import { Component } from "@angular/core";
import { FormLayoutComponent } from "../ui/layouts/form-layout/form-layout.component";
import { PassangerContainerComponent } from "../ui/containers/passanger-container/passanger-container.component";

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