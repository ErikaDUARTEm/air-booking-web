import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromptionsSectionComponent } from './promptions-section.component';
import { By } from '@angular/platform-browser';
import { RecomendationCardComponent } from '../recomendation-card/recomendation-card.component';
import { PromptionsCardComponent } from '../promptions-card/promptions-card.component';

describe('PromptionsSectionComponent', () => {
  let component: PromptionsSectionComponent;
  let fixture: ComponentFixture<PromptionsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptionsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of cards', () => {
    const recomendationCards = fixture.debugElement.queryAll(
      By.directive(RecomendationCardComponent)
    );
    const promotionCards = fixture.debugElement.queryAll(
      By.directive(PromptionsCardComponent)
    );

    expect(recomendationCards.length).toBe(2);
    expect(promotionCards.length).toBe(2);
  });

  it('should pass correct data to recomendation cards', () => {
    const cards = fixture.debugElement.queryAll(
      By.directive(RecomendationCardComponent)
    );

    component.items.forEach((item, index) => {
      const cardComponent = cards[index]
        .componentInstance as RecomendationCardComponent;
      expect(cardComponent.recomendation).toEqual(item);
    });
  });

  it('should pass correct data to promotion cards', () => {
    const cards = fixture.debugElement.queryAll(
      By.directive(PromptionsCardComponent)
    );

    component.promotions.forEach((promotion, index) => {
      const cardComponent = cards[index]
        .componentInstance as PromptionsCardComponent;
      expect(cardComponent.promotion).toEqual(promotion);
    });
  });

  it('should render correct link structure for recomendations', () => {
    const links = fixture.debugElement.queryAll(
      By.css('.promotions-section__link')
    );

    links.forEach((link, index) => {
      const card = link.query(By.directive(RecomendationCardComponent));
      const svg = link.query(By.css('svg'));

      expect(card).toBeTruthy();
      expect(svg).toBeTruthy();
      expect(svg.nativeElement.getAttribute('viewBox')).toBe('0 0 22 24');
    });
  });

  it('should render correct SVG icon', () => {
    const svgPath = fixture.debugElement.query(By.css('path')).nativeElement;
    expect(svgPath.getAttribute('d')).toContain(
      'M11.6 3.4L19.2 11H1V13H19.2L11.6 20.6L13 22L23 12L13 2L11.6 3.4Z'
    );
  });

  it('should have correct CSS classes', () => {
    const recomendationCards = fixture.debugElement.queryAll(
      By.directive(RecomendationCardComponent)
    );
    const promotionCards = fixture.debugElement.queryAll(
      By.directive(PromptionsCardComponent)
    );

    expect(recomendationCards.length).toBe(2);
    expect(promotionCards.length).toBe(2);

    recomendationCards.forEach((card) => {
      expect(
        card.nativeElement.classList.contains('promotions-section__card')
      ).toBeTrue();
    });

    promotionCards.forEach((card) => {
      expect(
        card.nativeElement.classList.contains('promotions-card')
      ).toBeTrue();
    });
  });
});
