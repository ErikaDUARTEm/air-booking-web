import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { ReservaContainerComponent } from "../container/reserva-container/reserva-container.component";

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: ReservaContainerComponent,   
                outlet: 'accordion'
            }
        ]
    }
]