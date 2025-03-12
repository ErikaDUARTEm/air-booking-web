import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExtraOptionComponent } from './extra-option.component';

describe('ExtraOptionComponent', () => {
  let component: ExtraOptionComponent;
  let fixture: ComponentFixture<ExtraOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar todos los inputs correctamente', () => {
    component.href = 'https://ejemplo.com';
    component.imgSrc = 'imagen.jpg';
    component.imgAlt = 'Texto alternativo';
    component.text = 'Texto del enlace';

    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const texto = anchor.textContent.trim();

    expect(anchor.href).toBe('https://ejemplo.com/');
    expect(img.src).toContain('imagen.jpg');
    expect(img.alt).toBe('Texto alternativo');
    expect(texto).toBe('Texto del enlace');
  });

  it('debería usar valores por defecto cuando no se proveen inputs', () => {
    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const texto = anchor.textContent.trim();

    expect(anchor.href).toContain('#');

    expect(img.alt).toBe('');
    expect(texto).toBe('');
  });

  it('debería tener los atributos correctos en la imagen', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(img.loading).toBe('lazy');
    expect(img.width).toBe(40);
    expect(img.height).toBe(40);
    expect(img.decoding).toBe('async');
    expect(img.getAttribute('data-nimg')).toBe('1');
    expect(img.style.color).toBe('transparent');
    expect(img.style.marginRight).toBe('8px');
  });

  it('debería actualizar los inputs dinámicamente', () => {
    component.href = '#inicial';
    component.text = 'Texto inicial';
    fixture.detectChanges();

    const anchorInicial = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(anchorInicial.href).toContain('#inicial');
    expect(anchorInicial.textContent.trim()).toBe('Texto inicial');

    component.href = '#actualizado';
    component.text = 'Texto actualizado';
    fixture.detectChanges();

    const anchorActualizado = fixture.debugElement.query(
      By.css('a')
    ).nativeElement;
    expect(anchorActualizado.href).toContain('#actualizado');
    expect(anchorActualizado.textContent.trim()).toBe('Texto actualizado');
  });
});
