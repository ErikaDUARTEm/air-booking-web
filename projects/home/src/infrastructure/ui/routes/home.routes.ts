import { Routes } from '@angular/router';
import { HomeComponent } from '../containers/home/home.component';
import { NavbarContainerComponent } from '../containers/navbar-container/navbar-container.component';
import { FooterContainerComponent } from '../containers/footer-container/footer-container.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '',
        component: NavbarContainerComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: FooterContainerComponent,
        outlet: 'footer',
      },
    ],
  },
];
