import { Routes } from '@angular/router';
import LayoutComponent from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-profile.route').then(m => m.default)
  },
  {
    path: 'inicio',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'catalogo', loadComponent: () => import('./components/catalogo/catalogo-inicio/catalogo-inicio.component').then(m => m.CatalogoInicioComponent) },
      { path: 'carrito', loadComponent: () => import('./components/carrito/carrito-listado/carrito-listado.component').then(m => m.CarritoListadoComponent) },
    ]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
