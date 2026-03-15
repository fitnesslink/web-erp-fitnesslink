import { Routes } from '@angular/router';

export const administrationRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-management/user-management.component').then(
        (m) => m.UserManagementComponent,
      ),
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./pages/role-management/role-management.component').then(
        (m) => m.RoleManagementComponent,
      ),
  },
  {
    path: 'permissions',
    loadComponent: () =>
      import('./pages/permission-management/permission-management.component').then(
        (m) => m.PermissionManagementComponent,
      ),
  },
];
