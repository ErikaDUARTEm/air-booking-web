import { inject, Injectable } from "@angular/core";
import { LoginUserService } from "../../infrastructure/services/users/login-user.service";
import { map, Observable, Subscription, tap } from "rxjs";
import { IUser } from "../../domain/model/user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginUserUseCase {
    private readonly _service = inject(LoginUserService);
    private readonly _router  = inject(Router);
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
                tap(response =>{
                    document.cookie = "AUTH_TOKEN=" + response.token + "; path=/; max-age=3600";
                    this._router.navigate(['/']);
                })
            ).subscribe()
        );
    }
}