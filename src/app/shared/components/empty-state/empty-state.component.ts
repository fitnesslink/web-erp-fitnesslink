import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <div class="empty-icon-box">
        <i [class]="'fa-light ' + icon()"></i>
      </div>
      <h3>{{ title() }}</h3>
      @if (message()) {
        <p>{{ message() }}</p>
      }
      <div class="empty-actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
    }

    .empty-icon-box {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background-color: #EFF4FA;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;

      i {
        font-size: 28px;
        color: #7C7B81;
      }
    }

    h3 {
      margin: 0 0 8px;
      color: #222B45;
      font-size: 16px;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #7C7B81;
      max-width: 400px;
      font-size: 14px;
    }

    .empty-actions {
      margin-top: 16px;
    }
  `,
})
export class EmptyStateComponent {
  title = input('No data found');
  message = input('');
  icon = input('fa-inbox');
}
