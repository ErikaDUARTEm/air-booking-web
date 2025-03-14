import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { ToggleUserService } from '../../infrastructure/services/users/toggle-user.service';

@Injectable({
  providedIn: 'root',
})
export class ToggleUserUseCase {
  private readonly _service = inject(ToggleUserService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(email: string): void {
    this.subscriptions.add(
      this._service
        .execute(email)
        .pipe(
          tap(() => {
            const updatedUsers = this._state.users.users
              .snapshot()
              .map((user) => {
                if (user.email === email) {
                  return {
                    ...user,
                    state: user.state === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                  };
                }
                return user;
              });

            this._state.users.users.set(updatedUsers);
          })
        )
        .subscribe()
    );
  }
}
