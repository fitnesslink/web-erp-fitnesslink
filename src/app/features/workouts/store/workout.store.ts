import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import { NotificationService } from '../../../core/services/notification.service';
import {
  CreateWorkoutDto,
  CreateWorkoutTaskDto,
  UpdateWorkoutDto,
  WorkoutDetailDto,
  WorkoutListViewDto,
} from '../models/workout.model';
import { WorkoutService } from '../services/workout.service';

@Injectable({ providedIn: 'root' })
export class WorkoutStore {
  private service = inject(WorkoutService);
  private notifications = inject(NotificationService);

  readonly items = signal<WorkoutListViewDto[]>([]);
  readonly selected = signal<WorkoutDetailDto | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly pagination = signal<Omit<PagedResult<unknown>, 'items'> | null>(null);
  readonly totalCount = computed(() => this.pagination()?.totalCount ?? 0);

  async loadWorkouts(params: PaginationParams): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getWorkouts(params));
      this.items.set(result.items);
      this.pagination.set({
        totalCount: result.totalCount,
        pageNumber: result.pageNumber,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
        hasPreviousPage: result.hasPreviousPage,
        hasNextPage: result.hasNextPage,
      });
    } catch {
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  async loadWorkout(id: string): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getWorkout(id));
      this.selected.set(result);
    } catch {
      this.selected.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async createWorkout(dto: CreateWorkoutDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.createWorkout(dto));
      this.notifications.success('Workout created successfully');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async updateWorkout(id: string, dto: UpdateWorkoutDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.updateWorkout(id, dto));
      this.notifications.success('Workout updated successfully');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async deleteWorkout(id: string): Promise<boolean> {
    try {
      await firstValueFrom(this.service.deleteWorkout(id));
      this.notifications.success('Workout deleted successfully');
      return true;
    } catch {
      return false;
    }
  }

  async addTask(workoutId: string, dto: CreateWorkoutTaskDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.addTask(workoutId, dto));
      await this.loadWorkout(workoutId);
      this.notifications.success('Task added');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async removeTask(workoutId: string, taskId: string): Promise<boolean> {
    try {
      await firstValueFrom(this.service.removeTask(workoutId, taskId));
      await this.loadWorkout(workoutId);
      this.notifications.success('Task removed');
      return true;
    } catch {
      return false;
    }
  }
}
