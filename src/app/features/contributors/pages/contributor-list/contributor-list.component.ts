import { Component } from '@angular/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-contributor-list',
  standalone: true,
  imports: [PageHeaderComponent, EmptyStateComponent],
  templateUrl: './contributor-list.component.html',
})
export class ContributorListComponent {}
