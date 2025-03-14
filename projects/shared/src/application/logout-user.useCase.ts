import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { LogoutService } from "../infrastructure/services/user/logout.service";
import { IToken } from "../domain/model/token.model";

@Injectable({
  providedIn: 'root',
})
export class LogoutUserUseCase {
    private readonly _service = inject(LogoutService);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(token: string): void {
        this.subscriptions.add(
            this._service.execute(token).pipe(
                tap(response => {
                    console.log("logout response",response);
                    if(response){
                        document.cookie = "AUTH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                    }
                    location.reload();
                })
            ).subscribe()
        );
    }
}