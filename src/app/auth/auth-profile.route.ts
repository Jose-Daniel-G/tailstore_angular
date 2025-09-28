// auth-profile.route.ts
import { Routes } from '@angular/router';
import {AuthProfileComponent} from './auth-profile.component';

export default [
  {
    path: '',
    component: AuthProfileComponent,
    children: [
      { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
] as Routes;
