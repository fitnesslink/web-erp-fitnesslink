import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar" [class.collapsed]="collapsed()">
      <div class="sidebar-top">
        @if (!collapsed()) {
          <img src="flhorizontallogo.svg" class="sb-logo" alt="FitnessLink" />
        } @else {
          <span class="logo-collapsed">FL</span>
        }
      </div>

      <ul class="nav-menu">
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span class="icon-box"><i class="fa-light fa-house"></i></span>
            @if (!collapsed()) { <span>Dashboard</span> }
          </a>
        </li>

        <li class="nav-section">
          <a (click)="toggleMenu('content')" class="has-submenu">
            <span class="icon-box"><i class="fa-light fa-person-running-fast"></i></span>
            @if (!collapsed()) {
              <span>Fitness Content</span>
              <img src="downPointer.svg" class="menu-pointer" [class.rotated]="openMenus['content']" />
            }
          </a>
          @if (openMenus['content'] && !collapsed()) {
            <ul class="sub-menu">
              <li><a routerLink="/movements" routerLinkActive="active">Movements</a></li>
              <li><a routerLink="/workouts" routerLinkActive="active">Workouts</a></li>
              <li><a routerLink="/programs" routerLinkActive="active">Programs</a></li>
            </ul>
          }
        </li>

        <li>
          <a routerLink="/customers" routerLinkActive="active">
            <span class="icon-box"><i class="fa-light fa-users"></i></span>
            @if (!collapsed()) { <span>Customers</span> }
          </a>
        </li>

        <li>
          <a routerLink="/contributors" routerLinkActive="active">
            <span class="icon-box"><i class="fa-light fa-handshake"></i></span>
            @if (!collapsed()) { <span>Contributors</span> }
          </a>
        </li>

        <li>
          <a routerLink="/personalizations" routerLinkActive="active">
            <span class="icon-box"><i class="fa-light fa-sliders"></i></span>
            @if (!collapsed()) { <span>Personalizations</span> }
          </a>
        </li>

        <li class="nav-section">
          <a (click)="toggleMenu('admin')" class="has-submenu">
            <span class="icon-box"><i class="fa-light fa-user-gear"></i></span>
            @if (!collapsed()) {
              <span>Administration</span>
              <img src="downPointer.svg" class="menu-pointer" [class.rotated]="openMenus['admin']" />
            }
          </a>
          @if (openMenus['admin'] && !collapsed()) {
            <ul class="sub-menu">
              <li><a routerLink="/admin/users" routerLinkActive="active">Users</a></li>
              <li><a routerLink="/admin/roles" routerLinkActive="active">Roles</a></li>
              <li><a routerLink="/admin/permissions" routerLinkActive="active">Permissions</a></li>
            </ul>
          }
        </li>

        <li>
          <a>
            <span class="icon-box"><i class="fa-light fa-circle-question"></i></span>
            @if (!collapsed()) { <span>Help</span> }
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: `
    .sidebar {
      width: 254px;
      height: 100vh;
      position: sticky;
      top: 0;
      background-color: #fff;
      color: #7C7B81;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      transition: width 0.2s;
      flex-shrink: 0;

      &.collapsed {
        width: 60px;
      }
    }

    .sidebar-top {
      padding: 20px 20px 30px 27px;
      display: flex;
      align-items: center;
    }

    .sb-logo {
      display: block;
      width: 157px;
    }

    .logo-collapsed {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: #23AF8D;
      color: #fff;
      font-weight: 700;
      font-size: 1rem;
    }

    .nav-menu {
      overflow: hidden;
      width: auto;
      margin: 0;
    }

    .nav-menu > li > a {
      display: flex;
      padding: 14px 30px;
      font-size: 14px;
      position: relative;
      color: #7C7B81;
      cursor: pointer;
      align-items: center;
      transition: color 0.15s;

      &:hover {
        color: #23AF8D;
      }

      &.active {
        color: #23AF8D;

        i {
          color: #23AF8D;
        }
      }
    }

    .icon-box {
      display: block;
      width: 35px;
      flex-shrink: 0;

      i {
        font-size: 20px;
      }
    }

    .menu-pointer {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.2s;

      &.rotated {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    .sub-menu {
      li a {
        display: block;
        padding: 12px 30px 12px 80px;
        font-size: 14px;
        color: #7C7B81;
        cursor: pointer;
        transition: background-color 0.15s, color 0.15s;

        &:hover {
          color: #222B45;
        }

        &.active {
          background-color: #E9F7F4;
          color: #23AF8D;
        }
      }
    }
  `,
})
export class SidebarComponent {
  collapsed = input(false);

  openMenus: Record<string, boolean> = {
    content: true,
  };

  toggleMenu(menu: string) {
    this.openMenus[menu] = !this.openMenus[menu];
  }
}
