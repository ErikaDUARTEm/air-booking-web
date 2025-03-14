import { Routes } from "@angular/router";
import { UsersContainerComponent } from "../../containers/user-container/user-container.component";
import { hasRoleGuard, SidebarComponent } from "shared";
import { LoginContainerComponent } from "../../containers/login-container/login-container.component";
import { UserRegisterComponent } from "../../forms/user-register/user-register.component";
import { RegisterContainerComponent } from "../../containers/register-container/register-container.component";

export const authRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                canActivate: [hasRoleGuard(["ADMIN"])],
                component: UsersContainerComponent,
            },
            {
                path: '',
                component: SidebarComponent,
                outlet: 'header'
            },
            {
                path: 'login',
                component: LoginContainerComponent
            },
            {
                path: 'register',
                component: RegisterContainerComponent
            }
        ],
    },
    
]