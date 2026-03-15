import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Divider } from 'primeng/divider';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TimeFormatPipe } from '../../../../shared/pipes/time-format.pipe';
import { WorkoutStore } from '../../store/workout.store';
import { ClassificationStore } from '../../../classification/store/classification.store';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    Select,
    InputNumber,
    Button,
    Card,
    TableModule,
    Divider,
    PageHeaderComponent,
    TimeFormatPipe,
  ],
  templateUrl: './workout-detail.component.html',
  styleUrl: './workout-detail.component.scss',
})
export class WorkoutDetailComponent implements OnInit {
  readonly store = inject(WorkoutStore);
  readonly classificationStore = inject(ClassificationStore);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  id = input<string>();
  isEdit = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    statusId: ['', Validators.required],
    estimatedTime: [0, [Validators.required, Validators.min(0)]],
  });

  async ngOnInit() {
    await this.classificationStore.loadAll();

    const workoutId = this.id();
    if (workoutId) {
      this.isEdit.set(true);
      await this.store.loadWorkout(workoutId);
      const workout = this.store.selected();
      if (workout) {
        const status = this.classificationStore
          .contentStatuses()
          .find((s) => s.name === workout.statusName);
        this.form.patchValue({
          name: workout.name,
          description: workout.description ?? '',
          statusId: status?.id ?? '',
          estimatedTime: workout.estimatedTime,
        });
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();

    if (this.isEdit()) {
      const success = await this.store.updateWorkout(this.id()!, {
        name: v.name,
        description: v.description || null,
        statusId: v.statusId,
        estimatedTime: v.estimatedTime,
      });
      if (success) this.router.navigate(['/workouts']);
    } else {
      const success = await this.store.createWorkout({
        name: v.name,
        description: v.description || null,
        statusId: v.statusId,
        estimatedTime: v.estimatedTime,
      });
      if (success) this.router.navigate(['/workouts']);
    }
  }

  async onRemoveTask(workoutId: string, taskId: string) {
    await this.store.removeTask(workoutId, taskId);
  }

  onBack() { this.router.navigate(['/workouts']); }
}
