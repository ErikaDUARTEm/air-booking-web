import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsModalContentComponent } from './seats-modal-content.component';

describe('SeatsModalContentComponent', () => {
  let component: SeatsModalContentComponent;
  let fixture: ComponentFixture<SeatsModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsModalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
