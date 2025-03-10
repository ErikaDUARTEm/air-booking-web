import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsBarContentComponent } from './seats-bar-content.component';

describe('SeatsBarContentComponent', () => {
  let component: SeatsBarContentComponent;
  let fixture: ComponentFixture<SeatsBarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsBarContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsBarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
