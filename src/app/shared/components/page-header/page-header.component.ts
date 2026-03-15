import { Component, input } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [Breadcrumb],
  template: `
    <div class="page-header">
      <div class="page-header-top">
        <div>
          <h2>{{ title() }}</h2>
          @if (subtitle()) {
            <p class="subtitle">{{ subtitle() }}</p>
          }
        </div>
        <div class="page-header-actions">
          <ng-content />
        </div>
      </div>
      @if (breadcrumbs().length) {
        <p-breadcrumb [model]="breadcrumbs()" [home]="home" />
      }
    </div>
  `,
  styles: `
    .page-header {
      margin-bottom: 20px;
    }

    .page-header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 10px;
    }

    h2 {
      margin: 0;
      color: #23AF8D;
      font-size: 20px;
      font-weight: 700;
    }

    .subtitle {
      margin: 4px 0 0;
      color: #7C7B81;
      font-size: 13px;
    }

    .page-header-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input('');
  breadcrumbs = input<MenuItem[]>([]);

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/dashboard' };
}
