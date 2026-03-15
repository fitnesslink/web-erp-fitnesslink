import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MovementStore } from '../../store/movement.store';
import { ClassificationStore } from '../../../classification/store/classification.store';

@Component({
  selector: 'app-movement-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    Select,
    Button,
    Card,
    PageHeaderComponent,
  ],
  templateUrl: './movement-detail.component.html',
  styleUrl: './movement-detail.component.scss',
})
export class MovementDetailComponent implements OnInit {
  readonly store = inject(MovementStore);
  readonly classificationStore = inject(ClassificationStore);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  id = input<string>();

  isEdit = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    statusId: ['', Validators.required],
  });

  async ngOnInit() {
    await this.classificationStore.loadAll();

    const movementId = this.id();
    if (movementId) {
      this.isEdit.set(true);
      await this.store.loadMovement(movementId);
      const movement = this.store.selected();
      if (movement) {
        const status = this.classificationStore
          .contentStatuses()
          .find((s) => s.name === movement.statusName);

        this.form.patchValue({
          name: movement.name,
          description: movement.description ?? '',
          statusId: status?.id ?? '',
        });
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();

    if (this.isEdit()) {
      const success = await this.store.updateMovement(this.id()!, {
        name: values.name,
        description: values.description || null,
        statusId: values.statusId,
      });
      if (success) this.router.navigate(['/movements']);
    } else {
      const success = await this.store.createMovement({
        name: values.name,
        description: values.description || null,
        statusId: values.statusId,
      });
      if (success) this.router.navigate(['/movements']);
    }
  }

  onBack() {
    this.router.navigate(['/movements']);
  }
}
