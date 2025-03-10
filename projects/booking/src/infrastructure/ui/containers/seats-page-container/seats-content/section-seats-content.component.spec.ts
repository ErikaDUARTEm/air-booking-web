import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSeatsContentComponent } from './section-seats-content.component';

describe('SectionSeatsContentComponent', () => {
  let component: SectionSeatsContentComponent;
  let fixture: ComponentFixture<SectionSeatsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSeatsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSeatsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
