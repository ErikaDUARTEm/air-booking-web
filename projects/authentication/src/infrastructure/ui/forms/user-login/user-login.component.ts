import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../../../domain/model/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'lib-user-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  private formBuilder = inject(FormBuilder);
  public onSubmit = output<IUser>();

  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  submit(){
    if(!this.form.valid)return;
    this.onSubmit.emit(this.form.getRawValue());
    this.resetForm();
  }

  public resetForm(){
    this.form.reset();    
  }
}
