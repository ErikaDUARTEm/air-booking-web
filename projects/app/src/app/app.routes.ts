import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('admin').then((m) => m.adminRoutes),
  },
  {
    path: 'booking',
    loadChildren: () => import('booking').then((b) => b.bookingRoutes),
  },

  {
    path: '',
    component: BodyLayoutComponent,
    loadChildren: () => import('availability').then((m) => m.routes),
  },
];
