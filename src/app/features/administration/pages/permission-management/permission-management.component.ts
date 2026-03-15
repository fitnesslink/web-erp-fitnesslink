import { Component } from '@angular/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-permission-management',
  standalone: true,
  imports: [PageHeaderComponent, EmptyStateComponent],
  templateUrl: './permission-management.component.html',
})
export class PermissionManagementComponent {}
