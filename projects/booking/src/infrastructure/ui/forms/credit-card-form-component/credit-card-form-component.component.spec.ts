import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardFormComponentComponent } from './credit-card-form-component.component';

describe('CreditCardFormComponentComponent', () => {
  let component: CreditCardFormComponentComponent;
  let fixture: ComponentFixture<CreditCardFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
