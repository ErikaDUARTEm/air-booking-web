import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaContainerComponent } from './reserva-container.component';

describe('ReservaContainerComponent', () => {
  let component: ReservaContainerComponent;
  let fixture: ComponentFixture<ReservaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
