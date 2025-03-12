import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsFooterComponent } from './seats-footer.component';

describe('SeatsFooterComponent', () => {
  let component: SeatsFooterComponent;
  let fixture: ComponentFixture<SeatsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
