import { NavbarContentComponent } from './../navbar-content/navbar-content.component';
import { SectionSeatsContentComponent } from './../seats-content/section-seats-content.component';

import { Component } from '@angular/core';
import { SeatsFooterContentComponent } from "../seats-footer-content/seats-footer-content.component";
import { SeatsDetailsContentComponent } from "../seats-details-content/seats-details-content.component";

@Component({
  selector: 'lib-seats-page',
  imports: [NavbarContentComponent, SectionSeatsContentComponent, SeatsFooterContentComponent, SeatsDetailsContentComponent],
  templateUrl: './seats-page.component.html',
  styleUrl: './seats-page.component.scss'
})
export class SeatsPageComponent {

}
