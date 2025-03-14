/*
 * Public API Surface of shared
 */

export { AdminHeaderComponent } from './infrastructure/ui/components/admin-header/admin-header.component';

export { StateFactory } from './domain/state/state.factory';
export type { IState } from './domain/model/state.model';
export { BodyLayoutComponent } from './infrastructure/ui/layouts/body-layout/body-layout.component';
export { LogoComponent } from './infrastructure/ui/components/logo/logo.component';
export type { INavRouter } from './domain/model/navRouter.model';
export {ModalComponent} from './infrastructure/ui/components/modal/modal.component';
export {environment} from './environments/environment';
export {SidebarComponent} from './infrastructure/ui/components/sidebar/sidebar.component';
export { hasRoleGuard } from './infrastructure/ui/guards/has-role.guard';

export { LoginLogoutButtonComponent } from './infrastructure/ui/components/login-logout-button/login-logout-button.component';
export { DecryptTokenUseCase } from './application/decrypt-token.usecase';

export type {IUserToken} from './domain/model/userToken.model'