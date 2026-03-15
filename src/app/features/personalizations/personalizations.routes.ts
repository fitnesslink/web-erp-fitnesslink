import { Routes } from '@angular/router';

export const personalizationRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/personalization-list/personalization-list.component').then(
        (m) => m.PersonalizationListComponent,
      ),
  },
];
