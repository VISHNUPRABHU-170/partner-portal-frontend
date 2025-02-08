import { Routes } from '@angular/router';
import { mainRoutes } from './modules/main/main.routes';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './modules/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./modules/auth/components/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: 'partner-portal',
    title: 'Dashboard',
    loadComponent: () => import('./modules/main/main.component').then(c => c.MainComponent),
    canActivate: [AuthGuard],
    children: mainRoutes,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
