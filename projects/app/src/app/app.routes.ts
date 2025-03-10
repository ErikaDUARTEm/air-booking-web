import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('booking').then((b) => b.bookingRoutes),
  },

  {
    path: '',
    component: BodyLayoutComponent,
    loadChildren: () => import('home').then((m) => m.routes),
  },
];
