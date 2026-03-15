import { Component, inject, OnInit } from '@angular/core';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserDto } from '../../../customers/models/customer.model';
import { PagedResult } from '../../../../core/models/paged-result.model';
import { PaginationParams } from '../../../../core/models/pagination-params.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputText,
    IconField,
    InputIcon,
    Tag,
    ConfirmDialog,
    PageHeaderComponent,
    EmptyStateComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  private notifications = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);

  users: UserDto[] = [];
  totalCount = 0;
  loading = false;
  pageSize = 20;
  private currentParams: PaginationParams = { pageNumber: 1, pageSize: this.pageSize };

  ngOnInit() { this.loadUsers(); }

  async loadUsers() {
    this.loading = true;
    try {
      const result = await firstValueFrom(this.adminService.getUsers(this.currentParams));
      this.users = result.items;
      this.totalCount = result.totalCount;
    } catch {
      this.users = [];
    } finally {
      this.loading = false;
    }
  }

  onLazyLoad(event: TableLazyLoadEvent) {
    const page = event.first != null && event.rows ? Math.floor(event.first / event.rows) + 1 : 1;
    this.currentParams = {
      ...this.currentParams,
      pageNumber: page,
      pageSize: event.rows ?? this.pageSize,
      sortBy: event.sortField as string | undefined,
      sortDirection: event.sortOrder === 1 ? 'asc' : 'desc',
    };
    this.loadUsers();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.currentParams = { ...this.currentParams, pageNumber: 1, search: value || undefined };
    this.loadUsers();
  }

  onDeactivate(id: string, name: string) {
    this.confirmationService.confirm({
      message: `Are you sure you want to deactivate "${name}"?`,
      header: 'Deactivate User',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: async () => {
        try {
          await firstValueFrom(this.adminService.deactivateUser(id));
          this.notifications.success('User deactivated');
          this.loadUsers();
        } catch { /* error interceptor handles it */ }
      },
    });
  }
}
