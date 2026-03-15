import { Routes } from '@angular/router';

export const workoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/workout-list/workout-list.component').then(
        (m) => m.WorkoutListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/workout-detail/workout-detail.component').then(
        (m) => m.WorkoutDetailComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/workout-detail/workout-detail.component').then(
        (m) => m.WorkoutDetailComponent,
      ),
  },
];
