import { Component, Input } from '@angular/core';
import { CardPromotionModel } from '../../../../domain/model/cardPromotion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-promptions-card',
  imports: [CommonModule],
  templateUrl: './promptions-card.component.html',
  styleUrl: './promptions-card.component.scss',
})
export class PromptionsCardComponent {
  @Input() promotion!: CardPromotionModel;
}
