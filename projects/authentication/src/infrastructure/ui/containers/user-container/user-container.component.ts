import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../../domain/model/user.model';
import { ListUsersUseCase } from '../../../../application/users/list-user.useCase';
import { UserDashboardComponent } from '../../components/user-dashboard/user-dashboard.component';
import { CreateUserUseCase } from '../../../../application/users/create-user.useCase';
import { AsyncPipe } from '@angular/common';
import { ToggleUserUseCase } from '../../../../application/users/toggle-user.useCase';

@Component({
  selector: 'lib-users-container',
  imports: [UserDashboardComponent, AsyncPipe],
  templateUrl: './user-container.component.html',
})
export class UsersContainerComponent implements OnInit, OnDestroy {

  private readonly _getUseCase = inject(ListUsersUseCase);
  private readonly _createUseCase = inject(CreateUserUseCase);
  private readonly _toggleUseCase = inject(ToggleUserUseCase);
  public users$: Observable<IUser[]>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._toggleUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.users$ = this._getUseCase.users$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._toggleUseCase.destroySubscriptions();
  }

  handleCreateUser(user: IUser) {
    this._createUseCase.execute(user);
  }

  handleToggleUser(email: string): void { 
    this._toggleUseCase.execute(email);
  }
}
