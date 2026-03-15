import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import {
  AddWeeklyWorkoutDto,
  CreateWorkoutProgramDto,
  ProgramScheduleDto,
  UpdateProgramDto,
  WorkoutProgramDetailDto,
  WorkoutProgramDto,
} from '../models/program.model';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private api = inject(ApiService);
  private path = '/api/v1/programs';

  getPrograms(params: PaginationParams): Observable<PagedResult<WorkoutProgramDto>> {
    return this.api.getPage<WorkoutProgramDto>(this.path, params);
  }

  getProgram(id: string): Observable<WorkoutProgramDetailDto> {
    return this.api.get<WorkoutProgramDetailDto>(`${this.path}/${id}`);
  }

  createProgram(dto: CreateWorkoutProgramDto): Observable<WorkoutProgramDto> {
    return this.api.post<WorkoutProgramDto>(this.path, dto);
  }

  updateProgram(id: string, dto: UpdateProgramDto): Observable<WorkoutProgramDto> {
    return this.api.put<WorkoutProgramDto>(`${this.path}/${id}`, dto);
  }

  addWeeklyWorkout(programId: string, dto: AddWeeklyWorkoutDto): Observable<ProgramScheduleDto> {
    return this.api.post<ProgramScheduleDto>(`${this.path}/${programId}/weekly-workouts`, dto);
  }
}
