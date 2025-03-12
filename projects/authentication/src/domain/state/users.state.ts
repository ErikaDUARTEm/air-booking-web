import { inject, Injectable } from "@angular/core";
import { StateFactory } from "shared";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserState {
    private readonly _factory = inject(StateFactory);

    //#region subjects
    private readonly users$ = new BehaviorSubject<IUser[]>([]);
    private readonly currentUser$ = new BehaviorSubject<IUser>(null);

    store() {
        return {
            users: this._factory.state(this.users$),
            currentUser: this._factory.state(this.currentUser$)
        }
    }
    //#endregion subjects
}
