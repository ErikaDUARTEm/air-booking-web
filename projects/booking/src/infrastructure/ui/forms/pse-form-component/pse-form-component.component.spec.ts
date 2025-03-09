import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseFormComponentComponent } from './pse-form-component.component';

describe('PseFormComponentComponent', () => {
  let component: PseFormComponentComponent;
  let fixture: ComponentFixture<PseFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
