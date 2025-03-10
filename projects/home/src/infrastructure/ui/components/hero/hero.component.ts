import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../../forms/search-form/search-form.component';
import { ExtraOptionComponent } from '../extra-option/extra-option.component';

@Component({
  selector: 'lib-hero',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchFormComponent,
    ExtraOptionComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  extraOptions = [
    {
      href: '#',
      imgSrc: 'https://www.copaair.com/assets/BusinessSeat.svg',
      imgAlt: 'BusinessSeat.svg',
      text: 'Solicita un ascenso',
    },
    {
      href: '#',
      imgSrc: 'https://www.copaair.com/assets/TC_Icon_Circle.svg',
      imgAlt: 'TC_Icon_Circle.svg',
      text: 'Tarjeta de crédito',
    },
    {
      href: '#',
      imgSrc: 'https://www.copaair.com/assets/Insurance.svg',
      imgAlt: 'Insurance.svg',
      text: 'Seguros de viaje',
    },
    {
      href: '#',
      imgSrc: 'https://www.copaair.com/assets/Car.svg',
      imgAlt: 'Car.svg',
      text: 'Reservar auto',
    },
  ];
}
