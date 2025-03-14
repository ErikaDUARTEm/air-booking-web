import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { CreateRouteService } from '../../infrastructure/services/routes/create-route.service';
import { StateIndex } from '../../domain/state';
import { IRoute } from '../../domain/model/route.model';

@Injectable({
  providedIn: 'root',
})
export class CreateRouteUseCase {
  private readonly _service = inject(CreateRouteService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription(); // Inicializa aquí
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(route: {
    origin: string;
    duration: number;
    destination: string;
  }): void {
    this.subscriptions.add(
      this._service
        .create(route)
        .pipe(
          tap((newRoute) => {
            const routes = this._state.routeStateIndex.routes.snapshot();
            routes.push(newRoute);
            this._state.routeStateIndex.routes.set(routes);
          })
        )
        .subscribe()
    );
  }
}
