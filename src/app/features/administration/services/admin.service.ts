import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import { UserDetailDto, UserDto, UpdateUserDto } from '../../customers/models/customer.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = inject(ApiService);
  private path = '/api/v1/users';

  getUsers(params: PaginationParams): Observable<PagedResult<UserDto>> {
    return this.api.getPage<UserDto>(this.path, params);
  }

  getUser(id: string): Observable<UserDetailDto> {
    return this.api.get<UserDetailDto>(`${this.path}/${id}`);
  }

  updateUser(id: string, dto: UpdateUserDto): Observable<UserDetailDto> {
    return this.api.put<UserDetailDto>(`${this.path}/${id}`, dto);
  }

  deactivateUser(id: string): Observable<void> {
    return this.api.delete(`${this.path}/${id}`);
  }
}
