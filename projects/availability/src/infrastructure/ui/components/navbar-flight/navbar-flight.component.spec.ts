import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFlightComponent } from './navbar-flight.component';

describe('NavbarFlightComponent', () => {
  let component: NavbarFlightComponent;
  let fixture: ComponentFixture<NavbarFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
