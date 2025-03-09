import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('booking').then(b => b.bookingRoutes)
  }

];
