import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, Menu],
  template: `
    <header class="app-header">
      <div class="header-left">
        <button class="toggle-btn" (click)="toggleSidebar.emit()">
          <i class="fa-light fa-bars"></i>
        </button>
        <div>
          <h3 class="module-title">ERP</h3>
          <p class="strapline">Fitness content for everyone!</p>
        </div>
      </div>

      <div class="header-right">
        <a routerLink="/notifications" class="notification-bell">
          <span class="alert-dot"></span>
          <i class="fa-light fa-bell"></i>
        </a>

        <div class="avatar-section" (click)="userMenu.toggle($event)">
          <div class="avatar-circle">
            <i class="fa-light fa-user"></i>
          </div>
          <div class="avatar-content">
            <p class="name">Admin</p>
            <p class="role">Manager</p>
          </div>
        </div>
        <p-menu #userMenu [model]="userMenuItems" [popup]="true" />
      </div>
    </header>
  `,
  styles: `
    .app-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: transparent;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #7C7B81;
      padding: 8px;
      border-radius: 8px;

      &:hover {
        background-color: #EFF4FA;
        color: #222B45;
      }
    }

    .module-title {
      font-size: 20px;
      font-weight: 700;
      color: #222B45;
      margin: 0;
    }

    .strapline {
      color: #7C7B81;
      font-size: 13px;
      padding-top: 4px;
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .notification-bell {
      position: relative;
      padding: 10px;
      font-size: 20px;
      color: #7C7B81;
      cursor: pointer;

      &:hover {
        color: #222B45;
      }
    }

    .alert-dot {
      width: 7px;
      height: 7px;
      background-color: #EA4335;
      border-radius: 50%;
      display: block;
      position: absolute;
      top: 6px;
      right: 6px;
      border: 1px solid #F0F4F5;
    }

    .avatar-section {
      display: flex;
      align-items: center;
      cursor: pointer;
      border-left: 1px solid #ccc;
      padding-left: 16px;
      margin-left: 8px;
    }

    .avatar-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #EFF4FA;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #7C7B81;
      font-size: 16px;
    }

    .avatar-content {
      padding-left: 10px;
    }

    .avatar-content .name {
      font-weight: 600;
      color: #222B45;
      font-size: 13px;
      margin: 0;
    }

    .avatar-content .role {
      color: #7C7B81;
      font-size: 12px;
      margin: 0;
      padding-top: 2px;
    }
  `,
})
export class TopbarComponent {
  private authService = inject(AuthService);

  toggleSidebar = output<void>();

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
    {
      separator: true,
    },
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => this.authService.logout(),
    },
  ];
}
