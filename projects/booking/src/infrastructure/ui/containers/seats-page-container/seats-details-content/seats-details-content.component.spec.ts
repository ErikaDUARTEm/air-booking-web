import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsDetailsContentComponent } from './seats-details-content.component';

describe('SeatsDetailsContentComponent', () => {
  let component: SeatsDetailsContentComponent;
  let fixture: ComponentFixture<SeatsDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsDetailsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
