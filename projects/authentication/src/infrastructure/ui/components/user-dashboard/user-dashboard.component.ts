import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { IUser } from '../../../../domain/model/user.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'lib-user-dashboard',
  imports: [NgFor, NgClass],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  public users = input.required<IUser[]>();
  public onCreateUser = output<IUser>();
  public onToggleUser = output<string>();

  private newUser: IUser = {
    name: "Nuevo Usuario",
    email: "nuevo@ejemplo.com",
    password: "123",
    documentId: "XYZ123456",
    phoneNumber: "+0000000000",
    nacionality: "Undefined"
  };

  createUser() {
    this.onCreateUser.emit(this.newUser);
  }

  toggleUser(user: IUser) {
    this.onToggleUser.emit(user.email);
  }
}
