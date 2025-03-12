import { Routes } from '@angular/router';
import { HomeComponent } from '../containers/home/home.component';
import { NavbarContainerComponent } from '../containers/navbar-container/navbar-container.component';
import { FooterContainerComponent } from '../containers/footer-container/footer-container.component';
import { NavbarFlightContainerComponent } from '../containers/navbar-flight-container/navbar-flight-container.component';
import { FooterFlightContainerComponent } from '../containers/footer-flight-container/footer-flight-container.component';
import { FlightSelectionComponent } from '../containers/flight-selection/flight-selection.component';

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
  {
    path: 'flight-selection',
    children: [
      {
        path: '',
        component: FlightSelectionComponent,
      },
      {
        path: '',
        component: NavbarFlightContainerComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: FooterFlightContainerComponent,
        outlet: 'footer',
      },
    ],
  },
];
