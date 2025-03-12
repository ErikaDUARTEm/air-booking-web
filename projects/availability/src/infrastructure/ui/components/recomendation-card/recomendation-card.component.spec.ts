import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendationCardComponent } from './recomendation-card.component';
import { By } from '@angular/platform-browser';
import { RecomendationCardModel } from '../../../../domain/model/recomendationCard.model';

describe('RecomendationCardComponent', () => {
  let component: RecomendationCardComponent;
  let fixture: ComponentFixture<RecomendationCardComponent>;
  const mockRecommendation: RecomendationCardModel = {
    icon: 'test-icon.svg',
    title: 'Test Title',
    description: 'Test Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendationCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendationCardComponent);
    component = fixture.componentInstance;
    component.recomendation = mockRecommendation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render recommendation data correctly', () => {
    const img = fixture.debugElement.query(
      By.css('.recomendation-card__image')
    );
    const title = fixture.debugElement.query(
      By.css('.recomendation-card__info-title')
    );
    const description = fixture.debugElement.query(
      By.css('.recomendation-card__info-description')
    );

    expect(img.nativeElement.src).toContain(mockRecommendation.icon);
    expect(title.nativeElement.textContent.trim()).toBe(
      mockRecommendation.title
    );
    expect(description.nativeElement.textContent.trim()).toBe(
      mockRecommendation.description
    );
  });

  it('should have correct image alt text', () => {
    const img = fixture.debugElement.query(
      By.css('.recomendation-card__image')
    );
    expect(img.nativeElement.alt).toBe('recomendation icon');
  });

  it('should apply correct CSS classes', () => {
    const card = fixture.debugElement.query(By.css('.recomendation-card'));
    const infoSection = fixture.debugElement.query(
      By.css('.recomendation-card__info')
    );

    expect(card).toBeTruthy();
    expect(infoSection).toBeTruthy();
    expect(
      card.nativeElement.classList.contains('recomendation-card')
    ).toBeTrue();
  });
});
