import { Component, inject, OnInit } from '@angular/core';
import { AccordionComponent } from "../../components/accordion/accordion.component";
import { GetReservationUseCase } from '../../../../application/get-reservations.usecase';
import { Observable } from 'rxjs';
import { IReservationData } from '../../../../domain/model/reservation.model';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lib-reserva-container',
    imports: [AccordionComponent, AsyncPipe],
    templateUrl: './reserva-container.component.html',
})
export class ReservaContainerComponent implements OnInit {

    public data$: Observable<IReservationData[]>;
    private readonly _getReservationUseCase = inject(GetReservationUseCase);

    ngOnInit(): void {
        this._getReservationUseCase.initSubscriptions();
        this._getReservationUseCase.execute();
        this.data$ = this._getReservationUseCase.allReservations$();

        this.data$.subscribe(data => {
            console.log("Data recibida en ngOnInit: ", data);
        });
    }

    ngOnDestroy(): void {
        this._getReservationUseCase.destroySubscriptions();
    }
}