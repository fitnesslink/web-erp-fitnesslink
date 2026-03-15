import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MovementStore } from '../movements/store/movement.store';
import { WorkoutStore } from '../workouts/store/workout.store';
import { ProgramStore } from '../programs/store/program.store';
import { CustomerStore } from '../customers/store/customer.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2 class="page-title">Dashboard</h2>
    <div class="dashboard-grid">
      <a routerLink="/movements" class="stat-card">
        <div class="stat-icon-box">
          <i class="fa-light fa-person-running-fast"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Movements</span>
          <span class="stat-value">{{ movementCount() }}</span>
        </div>
      </a>

      <a routerLink="/workouts" class="stat-card">
        <div class="stat-icon-box">
          <i class="fa-light fa-dumbbell"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Workouts</span>
          <span class="stat-value">{{ workoutCount() }}</span>
        </div>
      </a>

      <a routerLink="/programs" class="stat-card">
        <div class="stat-icon-box">
          <i class="fa-light fa-calendar-days"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Programs</span>
          <span class="stat-value">{{ programCount() }}</span>
        </div>
      </a>

      <a routerLink="/customers" class="stat-card">
        <div class="stat-icon-box">
          <i class="fa-light fa-users"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Customers</span>
          <span class="stat-value">{{ customerCount() }}</span>
        </div>
      </a>
    </div>
  `,
  styles: `
    .page-title {
      color: #23AF8D;
      margin-bottom: 24px;
      font-size: 22px;
      font-weight: 700;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background-color: #fff;
      border-radius: 10px;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s, transform 0.2s;
      border: 1px solid #EFF4FA;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }
    }

    .stat-icon-box {
      width: 55px;
      height: 55px;
      background-color: rgba(35, 175, 141, 0.12);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      i {
        font-size: 24px;
        color: #23AF8D;
      }
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-label {
      font-size: 13px;
      color: #7C7B81;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #222B45;
    }
  `,
})
export class DashboardComponent implements OnInit {
  private movementStore = inject(MovementStore);
  private workoutStore = inject(WorkoutStore);
  private programStore = inject(ProgramStore);
  private customerStore = inject(CustomerStore);

  movementCount = signal(0);
  workoutCount = signal(0);
  programCount = signal(0);
  customerCount = signal(0);

  async ngOnInit() {
    const params = { pageNumber: 1, pageSize: 1 };

    await Promise.all([
      this.movementStore.loadMovements(params),
      this.workoutStore.loadWorkouts(params),
      this.programStore.loadPrograms(params),
      this.customerStore.loadUsers(params),
    ]);

    this.movementCount.set(this.movementStore.totalCount());
    this.workoutCount.set(this.workoutStore.totalCount());
    this.programCount.set(this.programStore.totalCount());
    this.customerCount.set(this.customerStore.totalCount());
  }
}
