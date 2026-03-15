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
      height: 100vh;
      background-color: #F0F4F5;
      overflow: hidden;
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
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    /* Routed components fill available space and scroll by default */
    .layout-content ::ng-deep > *:not(router-outlet) {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
  `,
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(false);
}
