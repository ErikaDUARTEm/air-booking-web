import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoutButtonComponent } from './login-logout-button.component';

describe('LoginLogoutButtonComponent', () => {
  let component: LoginLogoutButtonComponent;
  let fixture: ComponentFixture<LoginLogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLogoutButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
