import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IUser } from "../../domain/model/user.model";
import { ListUsersService } from "../../infrastructure/services/users/list-user.service";

@Injectable({
    providedIn: 'root'
})
export class ListUsersUseCase {
    private readonly _service = inject(ListUsersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    users$(): Observable<IUser[]> {
        return this._state.users.users.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.execute().pipe(
                tap(data => this._state.users.users.set(data))
            ).subscribe()
        );
    }
}
