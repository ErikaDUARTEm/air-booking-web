import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFlightContainerComponent } from './footer-flight-container.component';

describe('FooterFlightContainerComponent', () => {
  let component: FooterFlightContainerComponent;
  let fixture: ComponentFixture<FooterFlightContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterFlightContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterFlightContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
