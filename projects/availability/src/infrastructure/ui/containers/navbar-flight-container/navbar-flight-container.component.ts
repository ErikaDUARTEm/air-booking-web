import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormUseCase } from '../../../../application/form.usecase';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NavbarFlightComponent } from '../../components/navbar-flight/navbar-flight.component';
import { AsyncPipe } from '@angular/common';
import { IFormFlight } from '../../../../domain/model/flight.model';

@Component({
  selector: 'lib-navbar-flight-container',
  imports: [NavbarFlightComponent, AsyncPipe],
  templateUrl: './navbar-flight-container.component.html',
})
export class NavbarFlightContainerComponent implements OnInit, OnDestroy {
  private readonly _formUsecase = inject(FormUseCase);

  public form$: Observable<IFormFlight>;

  ngOnInit() {
    this._formUsecase.initSubscriptions();
    this._formUsecase.viewForm();
    this.form$ = this._formUsecase.form$();
  }

  ngOnDestroy() {
    this._formUsecase.destroySubscriptions();
  }
}
