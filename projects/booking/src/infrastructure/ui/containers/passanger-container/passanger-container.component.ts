import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { PassengerFormComponent } from '../../forms/passenger-form/passenger-form.component';
import { GetFlyUsecase } from '../../../../application/booking/get-fly-passenger.usecase';
import { Observable, Subject } from 'rxjs';
import { IPassenger, IPassengerData } from '../../../../domain/model/passenger.model';
import { AsyncPipe } from '@angular/common';
import { SavePassengersUseCase } from '../../../../application/booking/save-passengers.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-passanger-container',
  imports: [PassengerFormComponent, AsyncPipe],
  templateUrl: './passanger-container.component.html',
})
export class PassangerContainerComponent implements OnInit{
  private readonly getFlyUsecase = inject(GetFlyUsecase);
  private readonly savePassengersUseCase = inject(SavePassengersUseCase);
  private readonly router = inject(Router);
  public passengersData$!: Observable<IPassengerData>;


  ngOnInit() {
    this.passengersData$ = this.getFlyUsecase.flyData$();
  }

  handleSubmit(passengers: IPassenger[]): void {
    console.log("Datos de pasajeros enviados:", passengers);
    this.savePassengersUseCase.savePassengers(passengers); 
    this.router.navigate(['/seats']);
  }


}
