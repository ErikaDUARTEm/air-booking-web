import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendationsSectionComponent } from './recomendations-section.component';
import { By } from '@angular/platform-browser';
import { RecomendationCardComponent } from '../recomendation-card/recomendation-card.component';

describe('RecomendationsSectionComponent', () => {
  let component: RecomendationsSectionComponent;
  let fixture: ComponentFixture<RecomendationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendationsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header content correctly', () => {
    const headerImage = fixture.debugElement.query(
      By.css('.recomendations-section__header-image')
    );
    const title = fixture.debugElement.query(
      By.css('.recomendations-section__header-title')
    );
    const description = fixture.debugElement.query(
      By.css('.recomendations-section__header-description')
    );

    expect(headerImage.nativeElement.src).toContain('Check-in.svg');
    expect(headerImage.nativeElement.alt).toBe('Prepárate para viajar!');
    expect(title.nativeElement.textContent.trim()).toBe(
      'Prepárate para viajar.'
    );
    expect(description.nativeElement.textContent.trim()).toContain(
      'experiencia agradable'
    );
  });

  it('should render correct number of recommendations', () => {
    const cards = fixture.debugElement.queryAll(
      By.directive(RecomendationCardComponent)
    );
    expect(cards.length).toBe(component.recomendations.length);
  });

  it('should pass correct data to recommendation cards', () => {
    const cards = fixture.debugElement.queryAll(
      By.directive(RecomendationCardComponent)
    );

    component.recomendations.forEach((recomendation, index) => {
      const cardComponent = cards[index]
        .componentInstance as RecomendationCardComponent;
      expect(cardComponent.recomendation).toEqual(recomendation);
    });
  });

  it('should render action button with icon', () => {
    const button = fixture.debugElement.query(
      By.css('.recomendations-section__button')
    );
    const buttonText = button.nativeElement.textContent.trim();
    const svgPath = button.query(By.css('path')).nativeElement;

    expect(button).toBeTruthy();
    expect(buttonText).toContain('Ir a requisitos');
    expect(svgPath.getAttribute('d')).toContain(
      'M7.166 13.833 11 10 7.166 6.167 8.333 5l5 5-5 5-1.167-1.167Z'
    );
  });

  it('should have correct CSS structure', () => {
    const section = fixture.debugElement.query(
      By.css('.recomendations-section')
    );
    const header = fixture.debugElement.query(
      By.css('.recomendations-section__header')
    );
    const content = fixture.debugElement.query(
      By.css('.recomendations-section__content')
    );

    expect(section).toBeTruthy();
    expect(header).toBeTruthy();
    expect(content).toBeTruthy();

    const cards = fixture.debugElement.queryAll(
      By.css('.recomendations-section__card')
    );
    expect(cards.length).toBe(3);
  });
});
