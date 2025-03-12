import { Component, input } from '@angular/core';
import { IReservationData } from '../../../../domain/model/reservation.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'shared';
   
@Component({
  selector: 'lib-details',
  imports: [CommonModule, ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  detailsData = input<IReservationData>();
  isPopupVisible = false;

  confirma(){
    console.log("Confirmar");
    
  }
  cancela(){
    console.log("Confirmar");
    
  }

 
}


