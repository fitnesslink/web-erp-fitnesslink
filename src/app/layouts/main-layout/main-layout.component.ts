import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, Toast],
  template: `
    <p-toast />
    <div class="layout-wrapper">
      <app-sidebar [collapsed]="sidebarCollapsed()" />
      <div class="layout-main">
        <app-topbar (toggleSidebar)="sidebarCollapsed.set(!sidebarCollapsed())" />
        <div class="layout-content">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: `
    .layout-wrapper {
      display: flex;
      min-height: 100vh;
      background-color: #F0F4F5;
    }

    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .layout-content {
      flex: 1;
      padding: 0 20px 20px 20px;
      overflow-y: auto;
    }
  `,
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(false);
}
