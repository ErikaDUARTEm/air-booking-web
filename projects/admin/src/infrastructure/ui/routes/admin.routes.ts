import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { ReservaContainerComponent } from '../container/reserva-container/reserva-container.component';
import { RoutesContainerComponent } from '../container/routes-container/routes-container.component';
import { ListFlightsComponent } from '../container/list-flights/list-flights.component';


export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'view',
        loadComponent: () =>
          import(
            '../container/view-analytics-container/view-analytics-container.component'
          ).then((m) => m.ViewAnalyticsContainerComponent),
      },
      {
        path: 'booking',
        component: ReservaContainerComponent,
      },
      {
        path: 'routes',
        component: RoutesContainerComponent,
      },
      {
        path: 'flights',
        component: ListFlightsComponent,
      },
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
    ],
  },
];
