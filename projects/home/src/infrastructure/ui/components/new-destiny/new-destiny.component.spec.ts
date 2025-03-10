import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewDestinyComponent } from './new-destiny.component';
import { By } from '@angular/platform-browser';

describe('NewDestinyComponent', () => {
  let component: NewDestinyComponent;
  let fixture: ComponentFixture<NewDestinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDestinyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewDestinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render main image with correct attributes', () => {
    const img = fixture.debugElement.query(By.css('.new-destiny__image'));
    expect(img.nativeElement.src).toContain(
      'Tall-large-nuevo-destino-SAN.webp'
    );
    expect(img.nativeElement.alt).toBe('product tall image');
  });

  it('should display content banner', () => {
    const banner = fixture.debugElement.query(By.css('.new-destiny__banner'));
    expect(banner).toBeTruthy();
  });

  it('should show seal with correct image', () => {
    const sealImg = fixture.debugElement.query(
      By.css('.new-destiny__seal img')
    );
    expect(sealImg.nativeElement.src).toContain('Nuevo%20Destino%20Logo.svg');
  });

  it('should display correct text content', () => {
    const title = fixture.debugElement.query(
      By.css('.new-destiny__text-title')
    );
    const description = fixture.debugElement.query(
      By.css('.new-destiny__text-description')
    );

    const normalizedTitle = title.nativeElement.textContent
      .replace(/\s+/g, ' ')
      .trim();

    expect(normalizedTitle).toBe('Nuevo Destino: San Diego');
    expect(description.nativeElement.textContent).toContain(
      '¡Prepárate para descubrir la joya del Pacífico!'
    );
  });

  it('should have functional booking button', () => {
    const button = fixture.debugElement.query(
      By.css('.new-destiny__text-button')
    );
    const svg = button.query(By.css('svg'));

    expect(button.nativeElement.textContent).toContain('Reserva ya');
    expect(svg).toBeTruthy();
    expect(svg.nativeElement.getAttribute('viewBox')).toBe('0 0 8 12');
  });
});
