import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFlightComponent } from './table-flight.component';

describe('TableFlightComponent', () => {
  let component: TableFlightComponent;
  let fixture: ComponentFixture<TableFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
