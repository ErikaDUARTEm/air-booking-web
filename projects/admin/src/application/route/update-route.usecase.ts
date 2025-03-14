import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { UpdateRouteService } from '../../infrastructure/services/routes/update-route.service';
import { StateIndex } from '../../domain/state';
import { IRoute } from '../../domain/model/route.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateRouteUseCase {
  private readonly _service = inject(UpdateRouteService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription(); // Inicializa aquí
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(route: IRoute): void {
    this.subscriptions.add(
      this._service
        .update(route)
        .pipe(
          tap((updatedRoute) => {
            const routes = this._state.routeStateIndex.routes.snapshot();
            const index = routes.findIndex(
              (r) => r.routeId === updatedRoute.routeId
            );
            if (index !== -1) {
              routes[index] = updatedRoute;
              this._state.routeStateIndex.routes.set(routes);
            }
          })
        )
        .subscribe()
    );
  }
}
