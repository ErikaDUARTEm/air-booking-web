import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRoute } from '../../../../domain/model/route.model';
import { CommonModule } from '@angular/common';
import { RoutesCardComponent } from '../../components/routes-card/routes-card.component';

@Component({
  selector: 'lib-routes-layout',
  standalone: true,
  imports: [CommonModule, RoutesCardComponent],
  templateUrl: './routes-layout.component.html',
  styleUrls: ['./routes-layout.component.scss'],
})
export class RoutesLayoutComponent {
  @Input() routes: IRoute[] | null = null; // Recibe las rutas desde el container
  @Output() editRoute = new EventEmitter<IRoute>(); // Reenvía el evento de edición
  @Output() deleteRoute = new EventEmitter<IRoute>(); // Reenvía el evento de eliminación
  @Output() createRoute = new EventEmitter<{
    origin: string;
    duration: number;
    destination: string;
  }>(); // Reenvía el evento de creación

  createRouteHandler() {
    const origin = prompt('Origen:');
    const duration = prompt('Duración:');
    const destination = prompt('Destino:');

    if (origin && duration && destination) {
      const newRoute = {
        origin,
        duration: parseInt(duration, 10),
        destination,
      };
      console.log('Creando nueva ruta:', newRoute);
      this.createRoute.emit(newRoute);
    }
  }
}
