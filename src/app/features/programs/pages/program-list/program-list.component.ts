import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { TimeFormatPipe } from '../../../../shared/pipes/time-format.pipe';
import { ProgramStore } from '../../store/program.store';
import { PaginationParams } from '../../../../core/models/pagination-params.model';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputText,
    IconField,
    InputIcon,
    PageHeaderComponent,
    StatusBadgeComponent,
    EmptyStateComponent,
    TimeFormatPipe,
  ],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.scss',
})
export class ProgramListComponent implements OnInit {
  readonly store = inject(ProgramStore);
  private router = inject(Router);

  pageSize = 20;
  private currentParams: PaginationParams = { pageNumber: 1, pageSize: this.pageSize };

  ngOnInit() { this.store.loadPrograms(this.currentParams); }

  onLazyLoad(event: TableLazyLoadEvent) {
    const page = event.first != null && event.rows ? Math.floor(event.first / event.rows) + 1 : 1;
    this.currentParams = {
      ...this.currentParams,
      pageNumber: page,
      pageSize: event.rows ?? this.pageSize,
      sortBy: event.sortField as string | undefined,
      sortDirection: event.sortOrder === 1 ? 'asc' : 'desc',
    };
    this.store.loadPrograms(this.currentParams);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.currentParams = { ...this.currentParams, pageNumber: 1, search: value || undefined };
    this.store.loadPrograms(this.currentParams);
  }

  onCreate() { this.router.navigate(['/programs/create']); }
  onEdit(id: string) { this.router.navigate(['/programs', id]); }
}
