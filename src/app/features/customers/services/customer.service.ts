import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import { UserDetailDto, UserDto } from '../models/customer.model';
import { MOCK_CUSTOMERS, MOCK_CUSTOMER_DETAILS } from './customer-mock.data';

/**
 * Mock implementation - swap to API calls when the backend is ready.
 * Uncomment the ApiService-based methods and remove mock logic.
 */
@Injectable({ providedIn: 'root' })
export class CustomerService {
  // TODO: Replace with real API calls when ready
  // private api = inject(ApiService);
  // private path = '/api/v1/users';

  getUsers(params: PaginationParams): Observable<PagedResult<UserDto>> {
    let filtered = [...MOCK_CUSTOMERS];

    if (params.search) {
      const term = params.search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(term) ||
          u.lastName.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term),
      );
    }

    const totalCount = filtered.length;
    const start = (params.pageNumber - 1) * params.pageSize;
    const items = filtered.slice(start, start + params.pageSize);
    const totalPages = Math.ceil(totalCount / params.pageSize);

    return of({
      items,
      totalCount,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      totalPages,
      hasPreviousPage: params.pageNumber > 1,
      hasNextPage: params.pageNumber < totalPages,
    });
  }

  getUser(id: string): Observable<UserDetailDto> {
    const user = MOCK_CUSTOMER_DETAILS[id];
    return of(user);
  }
}
