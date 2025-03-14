import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { DeleteRouteService } from '../../infrastructure/services/routes/delete-route.service';
import { StateIndex } from '../../domain/state';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class DeleteRouteUseCase {
  private readonly _service = inject(DeleteRouteService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription(); // Inicializa aquí
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(routeId: string): void {
    this.subscriptions.add(
      this._service
        .delete(routeId)
        .pipe(
          tap(() => {
            const updatedRoutes = this._state.routeStateIndex.routes
              .snapshot()
              .filter((route) => route.routeId !== routeId);
            this._state.routeStateIndex.routes.set(updatedRoutes);
          })
        )
        .subscribe()
    );
  }
}
