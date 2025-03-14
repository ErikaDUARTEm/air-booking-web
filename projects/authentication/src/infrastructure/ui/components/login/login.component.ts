import { Component, OnDestroy, OnInit, output } from '@angular/core';
import { UserLoginComponent } from '../../forms/user-login/user-login.component';
import { IUser } from '../../../../domain/model/user.model';

@Component({
  selector: 'lib-login',
  imports: [UserLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  public onLogin = output<IUser>();

  handleLogin(user:IUser){
    this.onLogin.emit(user);
  }
}
