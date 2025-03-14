import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { BaseFormComponent } from 'shared';
import { IFlightRequest } from '../../../../domain/model/flight.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlRouteComponent } from '../control-route/control-route.component';
import { IRoute } from '../../../../domain/model/route.model';

@Component({
  selector: 'lib-create-flight',
  imports: [BaseFormComponent, ReactiveFormsModule, ControlRouteComponent],
  templateUrl: './create-flight.component.html',
  styleUrl: './create-flight.component.scss',
})
export class CreateFlightComponent {
  @Input() routes: IRoute[];
  @Output() createFlight = new EventEmitter<IFlightRequest>();
  flightRequest: any = {
    flightNumber: 'ABC123',
    flightModel: 'Boeing 747',
  
    price: 500,
  };
  customLabels: Record<string, string> = {
    flightNumber: 'Número de Vuelo',
    flightModel: 'Modelo de Avión',
    
    price: 'Precio',
  };
  private formBuilder = inject(FormBuilder);
  public formGroup = this.formBuilder.group({
    flightNumber: ['', Validators.required],
    flightModel: ['', Validators.required],
    routeId: ['', Validators.required],
    price: ['', Validators.required],
    departureTime: ['', Validators.required],
    arrivalTime: ['', Validators.required],
  });

  submit() {
    if (this.formGroup.valid) {
      this.createFlight.emit(this.formGroup.value as unknown as IFlightRequest);
      console.log('se paso todo bien');
      this.formGroup.reset();
    } else {
      console.log(this.formGroup.value);
    }
  }

  
}

