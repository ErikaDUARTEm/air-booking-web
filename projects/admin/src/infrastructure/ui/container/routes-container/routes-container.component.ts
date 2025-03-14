import { Component, OnInit } from '@angular/core';
import { GetRouteUseCase } from '../../../../application/route/get-route.usecase';
import { DeleteRouteUseCase } from '../../../../application/route/delete-route.usecase';
import { UpdateRouteUseCase } from '../../../../application/route/update-route.usecase';
import { CreateRouteUseCase } from '../../../../application/route/create-route.usecase'; // Importa el caso de uso
import { RoutesLayoutComponent } from '../../components/routes-layout/routes-layout.component';
import { IRoute } from '../../../../domain/model/route.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-routes-container',
  standalone: true,
  imports: [CommonModule, RoutesLayoutComponent],
  templateUrl: './routes-container.component.html',
})
export class RoutesContainerComponent implements OnInit {
  routes$: Observable<IRoute[]>;

  constructor(
    private getRouteUseCase: GetRouteUseCase,
    private deleteRouteUseCase: DeleteRouteUseCase,
    private updateRouteUseCase: UpdateRouteUseCase,
    private createRouteUseCase: CreateRouteUseCase // Agrega el caso de uso
  ) {}

  ngOnInit(): void {
    this.getRouteUseCase.initSubscriptions();
    this.getRouteUseCase.execute();
    this.routes$ = this.getRouteUseCase.allRoutes$();
  }

  ngOnDestroy(): void {
    this.getRouteUseCase.destroySubscriptions();
    this.deleteRouteUseCase.destroySubscriptions();
  }

  onCreateRoute(route: {
    origin: string;
    duration: number;
    destination: string;
  }): void {
    this.createRouteUseCase.execute(route);
  }

  onEditRoute(route: IRoute): void {
    this.updateRouteUseCase.execute(route);
  }

  onDeleteRoute(route: IRoute): void {
    this.deleteRouteUseCase.execute(route.routeId);
  }
}
