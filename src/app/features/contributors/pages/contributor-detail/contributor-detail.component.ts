import { Component, input } from '@angular/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-contributor-detail',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './contributor-detail.component.html',
})
export class ContributorDetailComponent {
  id = input<string>();
}
