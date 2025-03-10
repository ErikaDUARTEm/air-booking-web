import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    loadChildren: () => import('home').then((m) => m.routes),
  },
];
