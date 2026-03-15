import { Routes } from '@angular/router';

export const contributorRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/contributor-list/contributor-list.component').then(
        (m) => m.ContributorListComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/contributor-detail/contributor-detail.component').then(
        (m) => m.ContributorDetailComponent,
      ),
  },
];
