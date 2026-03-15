import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import {
  CreateMovementDto,
  MovementDetailDto,
  MovementListViewDto,
  UpdateMovementDto,
} from '../models/movement.model';

@Injectable({ providedIn: 'root' })
export class MovementService {
  private api = inject(ApiService);
  private path = '/api/v1/movements';

  getMovements(params: PaginationParams): Observable<PagedResult<MovementListViewDto>> {
    return this.api.getPage<MovementListViewDto>(`${this.path}/list-view`, params);
  }

  getMovement(id: string): Observable<MovementDetailDto> {
    return this.api.get<MovementDetailDto>(`${this.path}/${id}`);
  }

  createMovement(dto: CreateMovementDto): Observable<MovementDetailDto> {
    return this.api.post<MovementDetailDto>(this.path, dto);
  }

  updateMovement(id: string, dto: UpdateMovementDto): Observable<MovementDetailDto> {
    return this.api.put<MovementDetailDto>(`${this.path}/${id}`, dto);
  }

  deleteMovement(id: string): Observable<void> {
    return this.api.delete(`${this.path}/${id}`);
  }
}
