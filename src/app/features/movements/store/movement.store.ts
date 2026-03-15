import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PagedResult } from '../../../core/models/paged-result.model';
import { PaginationParams } from '../../../core/models/pagination-params.model';
import { NotificationService } from '../../../core/services/notification.service';
import {
  CreateMovementDto,
  MovementDetailDto,
  MovementListViewDto,
  UpdateMovementDto,
} from '../models/movement.model';
import { MovementService } from '../services/movement.service';

@Injectable({ providedIn: 'root' })
export class MovementStore {
  private service = inject(MovementService);
  private notifications = inject(NotificationService);

  readonly items = signal<MovementListViewDto[]>([]);
  readonly selected = signal<MovementDetailDto | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly pagination = signal<Omit<PagedResult<unknown>, 'items'> | null>(null);
  readonly totalCount = computed(() => this.pagination()?.totalCount ?? 0);

  async loadMovements(params: PaginationParams): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getMovements(params));
      console.log('Movements API response:', JSON.stringify(result, null, 2));
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

  async loadMovement(id: string): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getMovement(id));
      this.selected.set(result);
    } catch {
      this.selected.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async createMovement(dto: CreateMovementDto): Promise<boolean> {
    this.saving.set(true);
    try {
      await firstValueFrom(this.service.createMovement(dto));
      this.notifications.success('Movement created successfully');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async updateMovement(id: string, dto: UpdateMovementDto): Promise<boolean> {
    this.saving.set(true);
    try {
      const updated = await firstValueFrom(this.service.updateMovement(id, dto));
      this.selected.set(updated);
      this.notifications.success('Movement updated successfully');
      return true;
    } catch {
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  async deleteMovement(id: string): Promise<boolean> {
    try {
      await firstValueFrom(this.service.deleteMovement(id));
      this.notifications.success('Movement deleted successfully');
      return true;
    } catch {
      return false;
    }
  }
}
