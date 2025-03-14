import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { IUser } from '../../../../domain/model/user.model';
import { LoginUserUseCase } from '../../../../application/users/login-user.useCase';

@Component({
  selector: 'lib-login-container',
  imports: [LoginComponent],
  templateUrl: './login-container.component.html',
})
export class LoginContainerComponent implements OnInit, OnDestroy{

  private _loginUserUsecase = inject(LoginUserUseCase)

  ngOnInit(): void {
    this._loginUserUsecase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._loginUserUsecase.destroySubscriptions();
  }

  handleLogin(user:IUser){
    this._loginUserUsecase.execute(user);
  }

}
