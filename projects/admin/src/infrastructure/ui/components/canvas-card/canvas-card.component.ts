import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input, input } from '@angular/core';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { ChartSeries } from '../../../../domain/model/chart-series-model';
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-canvas-card',
  imports: [CommonModule, BarChartComponent, PieChartComponent],
  templateUrl: './canvas-card.component.html',
  styleUrl: './canvas-card.component.scss'
})
export class CanvasCardComponent {
  chartHeader= input<string>();
  chartData = input<Observable<ChartSeries>>();
  @Input({transform: booleanAttribute}) isBar? : boolean = false;

}
