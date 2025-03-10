import { Component } from '@angular/core';
import { RecomendationCardComponent } from '../recomendation-card/recomendation-card.component';
import { CommonModule } from '@angular/common';
import { RecomendationCardModel } from '../../../../domain/model/recomendationCard.model';

@Component({
  selector: 'lib-recomendations-section',
  imports: [RecomendationCardComponent, CommonModule],
  templateUrl: './recomendations-section.component.html',
  styleUrl: './recomendations-section.component.scss',
})
export class RecomendationsSectionComponent {
  recomendations: RecomendationCardModel[] = [
    {
      icon: 'https://www.copaair.com/assets/Ticket.svg',
      title: 'Realiza tu Web Check-In',
      description:
        'Selecciona asientos, añade equipaje extra y obtén tus pases de abordar, desde 24 horas antes del vuelo.',
    },
    {
      icon: 'https://www.copaair.com/assets/Time.svg',
      title: 'Llega al aeropuerto tres horas antes',
      description:
        'Así te asegurarás de poder registrarte y pasar por los controles de seguridad con tiempo suficiente.',
    },
    {
      icon: 'https://www.copaair.com/assets/Document-icon.svg',
      title: 'Revisa los requisitos de viaje',
      description:
        'Tu país de origen y de destino pueden tener distintos requerimientos para entrar y salir. Verifícalos aquí.',
    },
  ];
}
