import { inject, Injectable } from '@angular/core';
import { DecryptTokenService } from '../infrastructure/services/token/decrypt-token.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IUserToken } from '../domain/model/userToken.model';

@Injectable({
  providedIn: 'root',
})
export class DecryptTokenUseCase {
  private readonly _service = inject(DecryptTokenService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  userToken$(): Observable<IUserToken> {
    return this._state.userTokenState.userToken.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(token: string): Observable<IUserToken> {
    return this._service
      .execute(token)
      .pipe(tap(this._state.userTokenState.userToken.set));
  }
}
