import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DecryptTokenUseCase } from '../../../application/decrypt-token.usecase';
import { catchError, map, of } from 'rxjs';
import { IUserToken } from '../../../domain/model/userToken.model';

export const hasRoleGuard = (roles: string[]): CanActivateFn => {
  const token = getCookie('AUTH_TOKEN');

  return () => {
    return inject(DecryptTokenUseCase)
      .execute(token)
      .pipe(
        map((user: IUserToken) => {
          if (user) {
            return roles.includes(user.role);
          }
          return false;
        }),
        catchError(() => {
          return of(roles.includes('USER'));
        })
      );
  };
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
