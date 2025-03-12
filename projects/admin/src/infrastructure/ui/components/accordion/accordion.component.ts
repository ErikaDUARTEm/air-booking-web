import { Component, input} from '@angular/core';
import { DetailsComponent } from "../details/details.component";
import { IReservationData } from '../../../../domain/model/reservation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-accordion',
  imports: [DetailsComponent, CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  dataReservas = input<IReservationData[]>();
 
}
    