import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'movements',
        loadChildren: () =>
          import('./features/movements/movements.routes').then(
            (m) => m.movementRoutes,
          ),
      },
      {
        path: 'workouts',
        loadChildren: () =>
          import('./features/workouts/workouts.routes').then(
            (m) => m.workoutRoutes,
          ),
      },
      {
        path: 'programs',
        loadChildren: () =>
          import('./features/programs/programs.routes').then(
            (m) => m.programRoutes,
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.routes').then(
            (m) => m.customerRoutes,
          ),
      },
      {
        path: 'personalizations',
        loadChildren: () =>
          import('./features/personalizations/personalizations.routes').then(
            (m) => m.personalizationRoutes,
          ),
      },
      {
        path: 'contributors',
        loadChildren: () =>
          import('./features/contributors/contributors.routes').then(
            (m) => m.contributorRoutes,
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then(
            (m) => m.notificationRoutes,
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/administration/administration.routes').then(
            (m) => m.administrationRoutes,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
