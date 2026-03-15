import { Component, computed, input } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [Tag],
  template: `
    <p-tag [value]="status()" [severity]="severity()" [rounded]="true" />
  `,
})
export class StatusBadgeComponent {
  status = input.required<string>();

  severity = computed(() => {
    switch (this.status()?.toLowerCase()) {
      case 'published':
      case 'active':
        return 'success';
      case 'draft':
        return 'warn';
      case 'archived':
      case 'inactive':
        return 'danger';
      default:
        return 'info';
    }
  });
}
