import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import { UserDetailDto, UserDto } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Injectable({ providedIn: 'root' })
export class CustomerStore {
  private service = inject(CustomerService);

  readonly items = signal<UserDto[]>([]);
  readonly selected = signal<UserDetailDto | null>(null);
  readonly loading = signal(false);
  readonly pagination = signal<Omit<PagedResult<unknown>, 'items'> | null>(null);
  readonly totalCount = computed(() => this.pagination()?.totalCount ?? 0);

  async loadUsers(params: PaginationParams): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getUsers(params));
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

  async loadUser(id: string): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getUser(id));
      this.selected.set(result);
    } catch {
      this.selected.set(null);
    } finally {
      this.loading.set(false);
    }
  }
}
