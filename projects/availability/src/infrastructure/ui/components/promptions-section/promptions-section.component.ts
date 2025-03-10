import { Component } from '@angular/core';
import { RecomendationCardModel } from '../../../../domain/model/recomendationCard.model';
import { RecomendationCardComponent } from '../recomendation-card/recomendation-card.component';
import { CommonModule } from '@angular/common';
import { PromptionsCardComponent } from '../promptions-card/promptions-card.component';
import { CardPromotionModel } from '../../../../domain/model/cardPromotion.model';

@Component({
  selector: 'lib-promptions-section',
  imports: [RecomendationCardComponent, CommonModule, PromptionsCardComponent],
  templateUrl: './promptions-section.component.html',
  styleUrl: './promptions-section.component.scss',
})
export class PromptionsSectionComponent {
  items: RecomendationCardModel[] = [
    {
      icon: 'https://www.copaair.com/assets/promociones.svg',
      title: 'Promociones',
      description:
        'Conoce nuestras más recientes promociones y tarifas especiales.',
    },
    {
      icon: 'https://www.copaair.com/assets/seguro-icon.svg',
      title: 'Complementa tu viaje',
      description:
        'Pensamos en todo lo necesario para complementar tu viaje: seguros, hoteles y transporte.',
    },
  ];

  promotions: CardPromotionModel[] = [
    {
      image: 'https://www.copaair.com/assets/Square-Large-panorama-feb-25.webp',
      icon: 'https://www.copaair.com/assets/Panorama-logo%20(1).webp',
      title: 'Panorama de las Américas',
      description: 'Conoce la última edición de nuestra revista a bordo.',
      textButton: 'Ver más',
      infoColor: '#0032a0',
    },
    {
      image: 'https://www.copaair.com/assets/Square-Large-gotuuri.webp',
      icon: 'https://www.copaair.com/assets/gotuuri-logo.webp',
      title: '¡Reserva tours y actividades!',
      description:
        'Mejora tu viaje incluyendo actividades turísticas y excursiones en tu destino favorito con Gotuuri.',
      textButton: 'Reserva aquí',
      infoColor: 'rgb(173, 124, 89)',
    },
  ];
}
