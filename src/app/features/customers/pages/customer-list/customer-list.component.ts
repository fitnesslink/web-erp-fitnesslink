import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { CustomerStore } from '../../store/customer.store';
import { PaginationParams } from '../../../../core/models/pagination-params.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputText,
    IconField,
    InputIcon,
    Tag,
    PageHeaderComponent,
    EmptyStateComponent,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  readonly store = inject(CustomerStore);
  private router = inject(Router);

  pageSize = 20;
  private currentParams: PaginationParams = { pageNumber: 1, pageSize: this.pageSize };

  ngOnInit() { this.store.loadUsers(this.currentParams); }

  onLazyLoad(event: TableLazyLoadEvent) {
    const page = event.first != null && event.rows ? Math.floor(event.first / event.rows) + 1 : 1;
    this.currentParams = {
      ...this.currentParams,
      pageNumber: page,
      pageSize: event.rows ?? this.pageSize,
      sortBy: event.sortField as string | undefined,
      sortDirection: event.sortOrder === 1 ? 'asc' : 'desc',
    };
    this.store.loadUsers(this.currentParams);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.currentParams = { ...this.currentParams, pageNumber: 1, search: value || undefined };
    this.store.loadUsers(this.currentParams);
  }

  onView(id: string) { this.router.navigate(['/customers', id]); }
}
