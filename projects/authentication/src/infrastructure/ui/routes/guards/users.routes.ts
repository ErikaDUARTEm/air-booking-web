import { Routes } from "@angular/router";
import { UsersContainerComponent } from "../../containers/user-container/user-container.component";
import { SidebarComponent } from "shared";

export const authRoutes: Routes = [
    {
        path: '',
        children: [
            {
            path: '',
            component: UsersContainerComponent,
            },
            {
                path: '',
                component: SidebarComponent,
                outlet: 'header'
            }
        ],
    }
]