import { Component, effect, Input, OnInit, signal } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartSeries } from '../../../../domain/model/chart-series-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-bar-chart',
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {

 @Input() barData: Observable<ChartSeries>;
  chartOptions = {};
  confirmed = signal<number>(0);
  canceled= signal<number>(0);
  pending= signal<number>(0);

  constructor(){
    effect(() => {
      if(this.barData){
        this.chartOptions = {
          animationEnabled: true,
          data: [{
          type: "column",
          color: "#0032a0",
          dataPoints: [
          { label: "Emitido",  y: this.confirmed() },
          { label: "Cancelado", y: this.canceled() },
          { label: "Pendiente", y: this.pending() },
          ]}]
          };
      }
    })
  }
  ngOnInit(): void {
    this.barData.subscribe(values => {
      this.confirmed.set(values.confirmed);
      this.canceled.set(values.canceled);
      this.pending.set(values.pending);
    })

  }

}
