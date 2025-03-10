import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have router link to home', () => {
    const link = fixture.debugElement.query(By.css('.logo'));
    const routerLink = link.injector.get(RouterLink);

    expect(routerLink.href).toBe('/');
  });

  it('should display logo image with correct attributes', () => {
    const img = fixture.debugElement.query(By.css('.logo__image'));

    expect(img.nativeElement.src).toContain('home/logo.png');
    expect(img.nativeElement.alt).toBe('AirSofka - Volver al inicio');
  });

  it('should have correct CSS classes', () => {
    const logo = fixture.debugElement.query(By.css('.logo'));
    const image = fixture.debugElement.query(By.css('.logo__image'));

    expect(logo).toBeTruthy();
    expect(image).toBeTruthy();
    expect(logo.nativeElement.classList.contains('logo')).toBeTrue();
    expect(image.nativeElement.classList.contains('logo__image')).toBeTrue();
  });

  it('should maintain accessibility standards', () => {
    const img = fixture.debugElement.query(By.css('img'));

    expect(img.nativeElement.alt).toBe('AirSofka - Volver al inicio');
    expect(img.nativeElement.getAttribute('role')).toBe('img');
    expect(img.nativeElement.getAttribute('aria-hidden')).toBe('false');
  });
});
