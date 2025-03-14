import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IRoute } from '../../domain/model/route.model';
import { GetRoutesService } from '../../infrastructure/services/routes/get-routes.service';
import { StateIndex } from '../../domain/state';

@Injectable({
  providedIn: 'root',
})
export class GetRouteUseCase {
  private readonly _service = inject(GetRoutesService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription;

  //#region Observables
  allRoutes$(): Observable<IRoute[]> {
    return this._state.routeStateIndex.routes.$();
  }

  currentRoute$(): Observable<IRoute | null> {
    return this._state.routeStateIndex.currentRoute.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.allRoutes$().subscribe((routes) => {
        console.log('All Routes:', routes);
      })
    );
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(tap((routes) => this._state.routeStateIndex.routes.set(routes)))
        .subscribe()
    );
  }

  selectedRoute(routeId: string): void {
    const currentRoute = this._state.routeStateIndex.routes
      .snapshot()
      .find((route) => route.routeId === routeId);
    this._state.routeStateIndex.currentRoute.set(currentRoute);
  }
  //#endregion
}
