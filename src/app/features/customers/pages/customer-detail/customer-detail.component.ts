import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CustomerStore } from '../../store/customer.store';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [Card, Tag, Button, PageHeaderComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {
  readonly store = inject(CustomerStore);
  private router = inject(Router);

  id = input<string>();

  ngOnInit() {
    const userId = this.id();
    if (userId) {
      this.store.loadUser(userId);
    }
  }

  onBack() { this.router.navigate(['/customers']); }
}
