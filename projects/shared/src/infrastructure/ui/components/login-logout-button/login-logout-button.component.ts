import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecryptTokenUseCase } from '../../../../application/decrypt-token.usecase';
import { Observable } from 'rxjs';
import { IUserToken } from '../../../../domain/model/userToken.model';
import { AsyncPipe } from '@angular/common';
import { LogoutUserUseCase } from '../../../../application/logout-user.useCase';

@Component({
  selector: 'lib-login-logout-button',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './login-logout-button.component.html',
  styleUrl: './login-logout-button.component.scss',
})
export class LoginLogoutButtonComponent implements OnInit, OnDestroy {
  private readonly _decryptToken = inject(DecryptTokenUseCase);
  private readonly _logout = inject(LogoutUserUseCase);
  private router = inject(Router);
  public user$: Observable<IUserToken>;

  ngOnInit(): void {
    this._decryptToken.initSubscriptions();
    this._logout.initSubscriptions();

    this._decryptToken.execute(this.getCookie('AUTH_TOKEN')).subscribe();
    this.user$ = this._decryptToken.userToken$();
  }

  ngOnDestroy(): void {
    this._decryptToken.destroySubscriptions();
    this._logout.destroySubscriptions();
  }

  logoutUser(){
    this._logout.execute(this.getCookie('AUTH_TOKEN'));
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
