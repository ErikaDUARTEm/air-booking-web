import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromptionsCardComponent } from './promptions-card.component';
import { By } from '@angular/platform-browser';
import { CardPromotionModel } from '../../../../domain/model/cardPromotion.model';

describe('PromptionsCardComponent', () => {
  let component: PromptionsCardComponent;
  let fixture: ComponentFixture<PromptionsCardComponent>;
  const mockPromotion: CardPromotionModel = {
    image: 'test-image.jpg',
    icon: 'test-icon.svg',
    title: 'Test Title',
    description: 'Test Description',
    textButton: 'Test Button',
    infoColor: '#ff0000',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptionsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptionsCardComponent);
    component = fixture.componentInstance;
    component.promotion = mockPromotion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all promotion data correctly', () => {
    const img = fixture.debugElement.query(By.css('.promotions-card__image'));
    const icon = fixture.debugElement.query(By.css('.promotions-card__icon'));
    const title = fixture.debugElement.query(By.css('.promotions-card__title'));
    const description = fixture.debugElement.query(
      By.css('.promotions-card__description')
    );
    const button = fixture.debugElement.query(
      By.css('.promotions-card__button')
    );
    const infoDiv = fixture.debugElement.query(
      By.css('.promotions-card__info')
    );

    expect(img.nativeElement.src).toContain(mockPromotion.image);
    expect(img.nativeElement.alt).toBe(mockPromotion.title);

    expect(icon.nativeElement.src).toContain(mockPromotion.icon);
    expect(icon.nativeElement.alt).toBe('promotion icon');

    expect(title.nativeElement.textContent.trim()).toBe(mockPromotion.title);
    expect(description.nativeElement.textContent.trim()).toBe(
      mockPromotion.description
    );

    expect(button.nativeElement.textContent.trim()).toContain(
      mockPromotion.textButton
    );
    expect(infoDiv.nativeElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should render SVG icon in button', () => {
    const svg = fixture.debugElement.query(
      By.css('.promotions-card__button-icon')
    );
    const path = svg.query(By.css('path'));

    expect(svg).toBeTruthy();
    expect(svg.nativeElement.getAttribute('viewBox')).toBe('0 0 8 12');
    expect(path.nativeElement.getAttribute('d')).toBeTruthy();
  });

  it('should display banner element', () => {
    const banner = fixture.debugElement.query(
      By.css('.promotions-card__banner')
    );
    expect(banner).toBeTruthy();
  });

  it('should handle missing promotion data', () => {
    component.promotion = {} as CardPromotionModel;
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('*'));
    expect(elements.length).toBeGreaterThan(0);
  });
});
