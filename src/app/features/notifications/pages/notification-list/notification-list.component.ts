import { Component } from '@angular/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [PageHeaderComponent, EmptyStateComponent],
  templateUrl: './notification-list.component.html',
})
export class NotificationListComponent {}
