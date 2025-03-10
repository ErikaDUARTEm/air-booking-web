import { Component, Input } from '@angular/core';
import { RecomendationCardModel } from '../../../../domain/model/recomendationCard.model';

@Component({
  selector: 'lib-recomendation-card',
  imports: [],
  templateUrl: './recomendation-card.component.html',
  styleUrl: './recomendation-card.component.scss',
})
export class RecomendationCardComponent {
  @Input() recomendation!: RecomendationCardModel | null;
}
