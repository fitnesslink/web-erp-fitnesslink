import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import { NotificationService } from '../../../core/services/notification.service';
import {
  AddWeeklyWorkoutDto,
  CreateWorkoutProgramDto,
  ProgramListViewDto,
  UpdateProgramDto,
  WorkoutProgramDetailDto,
} from '../models/program.model';
import { ProgramService } from '../services/program.service';

@Injectable({ providedIn: 'root' })
export class ProgramStore {
  private service = inject(ProgramService);
  private notifications = inject(NotificationService);

  readonly items = signal<ProgramListViewDto[]>([]);
  readonly selected = signal<WorkoutProgramDetailDto | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly pagination = signal<Omit<PagedResult<unknown>, 'items'> | null>(null);
  readonly totalCount = computed(() => this.pagination()?.totalCount ?? 0);

  async loadPrograms(params: PaginationParams): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getPrograms(params));
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

  async loadProgram(id: string): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getProgram(id));
      this.selected.set(result);
    } catch {
      this.selected.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async createProgram(dto: CreateWorkoutProgramDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.createProgram(dto));
      this.notifications.success('Program created successfully');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async updateProgram(id: string, dto: UpdateProgramDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.updateProgram(id, dto));
      this.notifications.success('Program updated successfully');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async addWeeklyWorkout(programId: string, dto: AddWeeklyWorkoutDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.addWeeklyWorkout(programId, dto));
      await this.loadProgram(programId);
      this.notifications.success('Workout assigned to schedule');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }
}
