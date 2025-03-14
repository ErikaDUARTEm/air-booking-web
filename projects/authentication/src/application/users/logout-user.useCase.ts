import { inject } from "@angular/core";
import { LogoutUserService } from "../../infrastructure/services/users/logout-user.service";
import { Subscription, tap } from "rxjs";
import { IUser } from "../../domain/model/user.model";

export class LogoutUserUseCase {
    private readonly _service = inject(LogoutUserService);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(user: IUser): void {
        this.subscriptions.add(
            this._service.execute(user).pipe(
                tap(response => {
                    if(response){
                        document.cookie = "AUTH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                    }
                })
            ).subscribe()
        );
    }
}