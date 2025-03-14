import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRouteComponent } from './control-route.component';

describe('ControlRouteComponent', () => {
  let component: ControlRouteComponent;
  let fixture: ComponentFixture<ControlRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
