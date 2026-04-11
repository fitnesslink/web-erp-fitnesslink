import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import {
  CreateWorkoutDto,
  CreateWorkoutTaskDto,
  UpdateWorkoutDto,
  WorkoutDetailDto,
  WorkoutDto,
  WorkoutListViewDto,
  WorkoutTaskDto,
} from '../models/workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private api = inject(ApiService);
  private path = '/api/v1/workouts';

  getWorkouts(params: PaginationParams): Observable<PagedResult<WorkoutListViewDto>> {
    return this.api.getPage<WorkoutListViewDto>(`${this.path}/list-view`, params);
  }

  getWorkout(id: string): Observable<WorkoutDetailDto> {
    return this.api.get<WorkoutDetailDto>(`${this.path}/${id}`);
  }

  createWorkout(dto: CreateWorkoutDto): Observable<WorkoutDto> {
    return this.api.post<WorkoutDto>(this.path, dto);
  }

  updateWorkout(id: string, dto: UpdateWorkoutDto): Observable<WorkoutDto> {
    return this.api.put<WorkoutDto>(`${this.path}/${id}`, dto);
  }

  deleteWorkout(id: string): Observable<void> {
    return this.api.delete(`${this.path}/${id}`);
  }

  addTask(workoutId: string, dto: CreateWorkoutTaskDto): Observable<WorkoutTaskDto> {
    return this.api.post<WorkoutTaskDto>(`${this.path}/${workoutId}/tasks`, dto);
  }

  removeTask(workoutId: string, taskId: string): Observable<void> {
    return this.api.delete(`${this.path}/${workoutId}/tasks/${taskId}`);
  }
}
