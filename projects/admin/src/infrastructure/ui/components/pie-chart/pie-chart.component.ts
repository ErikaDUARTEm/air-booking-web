import { Component, effect, input, Input, OnInit, signal } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Observable } from 'rxjs';
import { ChartSeries } from '../../../../domain/model/chart-series-model';

@Component({
  selector: 'lib-pie-chart',
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {

   @Input() pieDataSeries: Observable<ChartSeries>;

    chartOptions = {};
    confirmed = signal<number>(0);
    canceled= signal<number>(0);
    pending= signal<number>(0);
    bookings= signal<number>(0);

    constructor(){
      effect(() => {
        if(this.pieDataSeries){
          this.chartOptions = {
            animationEnabled: true,
            theme:"light2",
            data: [{
            type: "pie",
            startAngle: -90,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###.##'%'",
            dataPoints: [
              { y: this.calculatePercent(this.confirmed()), name: "Emitido" },
              { y: this.calculatePercent(this.canceled()), name: "Cancelado" },
              { y: this.calculatePercent(this.pending()), name: "Pendiente" },
            ]
            }]
          }
        }
      })
    }
    ngOnInit(): void {
      this.pieDataSeries.subscribe(values => {
        this.confirmed.set(values.confirmed);
        this.canceled.set(values.canceled);
        this.pending.set(values.pending);
        this.bookings.set(values.bookings);
      })

    }

    calculatePercent(value: number): number{
      return value * 100 / this.bookings() ;
    }

}
