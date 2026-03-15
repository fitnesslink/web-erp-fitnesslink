import { Routes } from '@angular/router';

export const movementRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movement-list/movement-list.component').then(
        (m) => m.MovementListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/movement-detail/movement-detail.component').then(
        (m) => m.MovementDetailComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/movement-detail/movement-detail.component').then(
        (m) => m.MovementDetailComponent,
      ),
  },
];
