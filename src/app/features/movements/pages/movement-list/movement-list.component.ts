import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { MovementStore } from '../../store/movement.store';
import { PaginationParams } from '../../../../core/models/pagination-params.model';

@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputText,
    IconField,
    InputIcon,
    ConfirmDialog,
    PageHeaderComponent,
    StatusBadgeComponent,
    EmptyStateComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './movement-list.component.html',
  styleUrl: './movement-list.component.scss',
})
export class MovementListComponent implements OnInit {
  readonly store = inject(MovementStore);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  pageSize = 20;
  private currentParams: PaginationParams = {
    pageNumber: 1,
    pageSize: this.pageSize,
  };

  ngOnInit() {
    this.store.loadMovements(this.currentParams);
  }

  onLazyLoad(event: TableLazyLoadEvent) {
    const page = event.first != null && event.rows
      ? Math.floor(event.first / event.rows) + 1
      : 1;

    this.currentParams = {
      ...this.currentParams,
      pageNumber: page,
      pageSize: event.rows ?? this.pageSize,
      sortBy: event.sortField as string | undefined,
      sortDirection: event.sortOrder === 1 ? 'asc' : 'desc',
    };

    this.store.loadMovements(this.currentParams);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.currentParams = {
      ...this.currentParams,
      pageNumber: 1,
      search: value || undefined,
    };
    this.store.loadMovements(this.currentParams);
  }

  onCreate() {
    this.router.navigate(['/movements/create']);
  }

  onEdit(id: string) {
    this.router.navigate(['/movements', id]);
  }

  onDelete(id: string, name: string) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${name}"?`,
      header: 'Delete Movement',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: async () => {
        const success = await this.store.deleteMovement(id);
        if (success) {
          this.store.loadMovements(this.currentParams);
        }
      },
    });
  }
}
