import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangerContainerComponent } from './passanger-container.component';

describe('PassangerContainerComponent', () => {
  let component: PassangerContainerComponent;
  let fixture: ComponentFixture<PassangerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassangerContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassangerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
