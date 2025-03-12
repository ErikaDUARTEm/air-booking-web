import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsFooterContentComponent } from './seats-footer-content.component';

describe('SeatsFooterContentComponent', () => {
  let component: SeatsFooterContentComponent;
  let fixture: ComponentFixture<SeatsFooterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsFooterContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsFooterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
