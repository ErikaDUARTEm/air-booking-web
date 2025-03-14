import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesLayoutComponent } from './routes-layout.component';

describe('RoutesLayoutComponent', () => {
  let component: RoutesLayoutComponent;
  let fixture: ComponentFixture<RoutesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
