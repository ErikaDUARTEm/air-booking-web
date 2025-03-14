import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IUser } from "../../domain/model/user.model";
import { Observable, Subscription, tap } from "rxjs";
import { CreateUserService } from "../../infrastructure/services/users/create-user.service";

@Injectable({
    providedIn: 'root'
})
export class CreateUserUseCase {
    private readonly _service = inject(CreateUserService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(user: IUser): Observable<IUser> {
        return this._service.execute(user).pipe(
          tap(newUser => {
            const updatedUsers = this._state.users.users.snapshot();
            this._state.users.users.set([...updatedUsers, newUser]);
          })
        );
      }
}
