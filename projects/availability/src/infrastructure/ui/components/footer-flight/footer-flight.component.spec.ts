import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFlightComponent } from './footer-flight.component';

describe('FooterFlightComponent', () => {
  let component: FooterFlightComponent;
  let fixture: ComponentFixture<FooterFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
