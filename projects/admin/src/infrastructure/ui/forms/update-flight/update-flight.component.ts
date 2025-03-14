import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormComponent } from 'shared';
import { IFlight, IFlightUpdate } from '../../../../domain/model/flight.model';
import { CommonModule } from '@angular/common';
import { ControlRouteComponent } from '../control-route/control-route.component';
import { IRoute } from '../../../../domain/model/route.model';

@Component({
  selector: 'lib-update-flight',
  imports: [ReactiveFormsModule, CommonModule, ControlRouteComponent],
  templateUrl: './update-flight.component.html',
  styleUrl: './update-flight.component.scss',
})
export class UpdateFlightComponent implements OnChanges {
  @Input() routes: IRoute[];

  @Input() flightFound: IFlight;
  @Output() updateFlight = new EventEmitter<IFlightUpdate>();

  private formBuilder = inject(FormBuilder);
  public formGroup = this.formBuilder.group({
    aggregateId: [{ value: '', disabled: true }, Validators.required],
    flightNumber: ['', Validators.required],
    routeId: ['', Validators.required],
    flightModel: ['', Validators.required],
    price: [0, Validators.required],
    departureTime: ['', Validators.required],
    arrivalTime: ['', Validators.required],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['flightFound'] && this.flightFound) {
      // Solo actualizar si el formulario NO ha sido modificado por el usuario
      if (this.formGroup.pristine) {
        this.patchFormValues();
      }
    }
  }

  private patchFormValues() {
    if (!this.flightFound) return;

    // Obtener valores actuales del formulario
    const currentValues = this.formGroup.getRawValue();

    // Verificar si los valores son realmente diferentes antes de sobrescribir
    if (
      currentValues.flightNumber === this.flightFound.flightNumber &&
      currentValues.routeId === this.flightFound.routeId &&
      currentValues.flightModel === this.flightFound.flightModel &&
      currentValues.price === this.flightFound.economyBasicPrice &&
      currentValues.departureTime ===
        this.formatDateForInput(this.flightFound.departureTime) &&
      currentValues.arrivalTime ===
        this.formatDateForInput(this.flightFound.arrivalTime)
    ) {
      return; // No hay cambios reales, evitamos sobrescribir
    }

    const formattedDepartureTime = this.formatDateForInput(
      this.flightFound.departureTime
    );
    const formattedArrivalTime = this.formatDateForInput(
      this.flightFound.arrivalTime
    );

    this.formGroup.patchValue(
      {
        aggregateId: this.flightFound.flightId,
        flightNumber: this.flightFound.flightNumber,
        routeId: this.flightFound.routeId,
        flightModel: this.flightFound.flightModel,
        price: this.flightFound.economyBasicPrice,
        departureTime: formattedDepartureTime,
        arrivalTime: formattedArrivalTime,
      },
      { emitEvent: false }
    );

    this.formGroup.markAsPristine();
  }

  submit() {
    if (this.formGroup.valid) {
      console.log(
        '✅ Formulario enviado:',
        this.formGroup.value as unknown as IFlightUpdate
      );
      this.updateFlight.emit(this.formGroup.getRawValue() as IFlightUpdate);
      this.formGroup.markAsPristine();
    } else {
      console.log('❌ Formulario inválido:', this.formGroup.getRawValue());
    }
  }
  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // ✅ Esto genera el formato yyyy-MM-ddTHH:mm
  }
}
