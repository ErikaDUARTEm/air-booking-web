import { BehaviorSubject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IRoute } from '../model/route.model';

@Injectable({
  providedIn: 'root',
})
export class RouteState {
  private readonly _factory = inject(StateFactory);

  //#region Observables
  private readonly routes$ = new BehaviorSubject<IRoute[]>([]);
  private readonly currentRoute$ = new BehaviorSubject<IRoute | null>(null);
  //#endregion

  store() {
    return {
      routes: this._factory.state(this.routes$),
      currentRoute: this._factory.state(this.currentRoute$),
    };
  }
}
