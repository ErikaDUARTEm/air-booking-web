import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BestFlightsComponent } from './best-flights.component';
import { FlightCardComponent } from '../best-flights-card/best-flights-card.component';

describe('BestFlightsComponent', () => {
  let component: BestFlightsComponent;
  let fixture: ComponentFixture<BestFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestFlightsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BestFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar todas las tarjetas de vuelo al inicio', () => {
    const tarjetas = fixture.debugElement.queryAll(
      By.directive(FlightCardComponent)
    );
    expect(tarjetas.length).toBe(6);
  });

  it('debería filtrar los vuelos al seleccionar una ruta', () => {
    const selector = fixture.debugElement.query(By.css('select')).nativeElement;

    selector.value = 'BOG-PTY';
    selector.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const tarjetasFiltradas = fixture.debugElement.queryAll(
      By.directive(FlightCardComponent)
    );
    expect(tarjetasFiltradas.length).toBe(1);
  });

  it('debería limpiar el filtro al hacer clic en el botón', () => {
    component.selectedRoute = 'BOG-PTY';
    fixture.detectChanges();

    const botonLimpiar = fixture.debugElement.query(
      By.css('.flight-list__clear-btn')
    );
    botonLimpiar.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedRoute).toBe('');
    const tarjetas = fixture.debugElement.queryAll(
      By.directive(FlightCardComponent)
    );
    expect(tarjetas.length).toBe(6);
  });

  it('debería mostrar el contenido del footer correctamente', () => {
    const boton = fixture.debugElement.query(
      By.css('.flight-list__more-btn')
    ).nativeElement;
    expect(boton.textContent.trim()).toBe('VER MÁS');

    const disclaimer = fixture.debugElement.query(
      By.css('.flight-list__disclaimer')
    ).nativeElement;
    expect(disclaimer.textContent).toContain('*Aplican restricciones');
    expect(disclaimer.querySelector('a').textContent).toBe(
      'Términos y condiciones'
    );
  });

  it('debería tener todas las opciones de ruta en el selector', () => {
    const selector = fixture.debugElement.query(By.css('select')).nativeElement;
    const opciones = selector.options;

    expect(opciones.length).toBe(7);

    expect(opciones[0].value).toBe('');
    expect(opciones[0].textContent).toContain('Seleccione ruta');

    const rutasEsperadas = [
      { valor: 'BOG-PTY', texto: 'Bogotá a Panamá' },
      { valor: 'CLO-PTY', texto: 'Cali a Panamá' },
      { valor: 'MDE-PTY', texto: 'Medellín a Panamá' },
      { valor: 'CLO-SCL', texto: 'Cali a Santiago de Chile' },
      { valor: 'BAQ-PTY', texto: 'Barranquilla a Panamá' },
      { valor: 'CUC-SCL', texto: 'Cúcuta a Santiago de Chile' },
    ];

    rutasEsperadas.forEach((ruta, index) => {
      const opcion = opciones[index + 1];
      expect(opcion.value).toBe(ruta.valor);
      expect(opcion.textContent.trim()).toBe(ruta.texto);
    });
  });
});
