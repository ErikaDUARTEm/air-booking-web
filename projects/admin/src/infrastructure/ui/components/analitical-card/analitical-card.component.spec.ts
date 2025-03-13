import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticalCardComponent } from './analitical-card.component';

describe('AnaliticalCardComponent', () => {
  let component: AnaliticalCardComponent;
  let fixture: ComponentFixture<AnaliticalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaliticalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
