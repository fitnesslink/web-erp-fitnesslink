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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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
