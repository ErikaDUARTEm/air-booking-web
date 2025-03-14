import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRoute } from '../../../../domain/model/route.model';

@Component({
  selector: 'lib-routes-card',
  standalone: true,
  imports: [],
  templateUrl: './routes-card.component.html',
  styleUrls: ['./routes-card.component.scss'],
})
export class RoutesCardComponent {
  @Input() routes: IRoute[] = [];
  @Output() editRoute = new EventEmitter<IRoute>();
  @Output() deleteRoute = new EventEmitter<IRoute>();
  selectedRoute: IRoute | null = null;

  // Lógica para editar la ruta
  editRouteHandler(route: IRoute) {
    const confirmEdit = confirm(
      '¿Estás seguro de que deseas editar esta ruta?'
    );
    if (confirmEdit) {
      const newOrigin = prompt('Nuevo origen:', route.origin);
      const newDuration = prompt('Nueva duración:', route.duration.toString());
      const newDestination = prompt('Nuevo destino:', route.destination);

      if (newOrigin && newDuration && newDestination) {
        this.selectedRoute = {
          ...route,
          origin: newOrigin,
          duration: parseInt(newDuration, 10),
          destination: newDestination,
        };
        console.log('Editando ruta:', this.selectedRoute);
        this.editRoute.emit(this.selectedRoute);
      }
    }
  }

  // Lógica para eliminar la ruta
  deleteRouteHandler(route: IRoute) {
    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar esta ruta?'
    );
    if (confirmDelete) {
      this.selectedRoute = route;
      console.log('Eliminando ruta:', this.selectedRoute);
      this.deleteRoute.emit(route);
    }
  }
}
