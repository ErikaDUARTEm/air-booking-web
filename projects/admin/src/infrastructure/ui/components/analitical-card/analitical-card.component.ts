import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { AnaliticalCard } from '../../../../domain/model/analitical-card-model';


@Component({
  selector: 'lib-analitical-card',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './analitical-card.component.html',
  styleUrl: './analitical-card.component.scss'
})
export class AnaliticalCardComponent {
  carData = input<AnaliticalCard>();

}
