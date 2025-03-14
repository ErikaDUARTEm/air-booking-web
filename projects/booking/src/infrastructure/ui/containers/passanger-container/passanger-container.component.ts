import { Component, OnInit, inject } from '@angular/core';
import { PassengerFormComponent } from '../../forms/passenger-form/passenger-form.component';
import { Observable } from 'rxjs';
import { IPassenger} from '../../../../domain/model/passenger.model';
import { AsyncPipe } from '@angular/common';
import { SavePassengersUseCase } from '../../../../application/booking/save-passengers.usecase';
import { Router } from '@angular/router';
import { FormUseCase, IFormFlight } from 'availability';

@Component({
  selector: 'lib-passanger-container',
  imports: [PassengerFormComponent, AsyncPipe],
  templateUrl: './passanger-container.component.html',
})
export class PassangerContainerComponent implements OnInit{
  private readonly getFlyUsecase = inject(FormUseCase);
  private readonly savePassengersUseCase = inject(SavePassengersUseCase);
  private readonly router = inject(Router);
  public passengersData$!: Observable<IFormFlight>;


  ngOnInit() {
    this.passengersData$ = this.getFlyUsecase.form$();
  }

  handleSubmit(passengers: IPassenger[]): void {
    console.log("Datos de pasajeros enviados:", passengers);
    this.savePassengersUseCase.setPassengers(passengers);
    this.router.navigate(['booking/seats']);
  }

}
