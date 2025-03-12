import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFlightContainerComponent } from './navbar-flight-container.component';

describe('NavbarFlightContainerComponent', () => {
  let component: NavbarFlightContainerComponent;
  let fixture: ComponentFixture<NavbarFlightContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFlightContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFlightContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
