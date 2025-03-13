import { Component } from '@angular/core';
import { UserLoginComponent } from '../../forms/user-login/user-login.component';

@Component({
  selector: 'lib-login',
  imports: [UserLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
