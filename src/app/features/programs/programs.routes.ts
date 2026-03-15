import { Routes } from '@angular/router';

export const programRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/program-list/program-list.component').then(
        (m) => m.ProgramListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/program-detail/program-detail.component').then(
        (m) => m.ProgramDetailComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/program-detail/program-detail.component').then(
        (m) => m.ProgramDetailComponent,
      ),
  },
];
