import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyDetailsComponent } from './fly-details.component';

describe('FlyDetailsComponent', () => {
  let component: FlyDetailsComponent;
  let fixture: ComponentFixture<FlyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
