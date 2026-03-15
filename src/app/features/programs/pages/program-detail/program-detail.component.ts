import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { Dialog } from 'primeng/dialog';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ProgramStore } from '../../store/program.store';
import { ClassificationStore } from '../../../classification/store/classification.store';
import { ProgramScheduleDto } from '../../models/program.model';

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputText,
    Textarea,
    Select,
    InputNumber,
    Button,
    Card,
    Divider,
    Dialog,
    PageHeaderComponent,
  ],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss',
})
export class ProgramDetailComponent implements OnInit {
  readonly store = inject(ProgramStore);
  readonly classificationStore = inject(ClassificationStore);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  id = input<string>();
  isEdit = signal(false);
  showAddDialog = false;

  days = DAY_NAMES.map((name, i) => ({ name, number: i + 1 }));

  newSchedule = { workoutId: '', weekNumber: 1, dayNumber: 1 };

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    statusId: ['', Validators.required],
    estimatedTime: [null as number | null],
  });

  async ngOnInit() {
    await this.classificationStore.loadAll();

    const programId = this.id();
    if (programId) {
      this.isEdit.set(true);
      await this.store.loadProgram(programId);
      const program = this.store.selected();
      if (program) {
        const status = this.classificationStore
          .contentStatuses()
          .find((s) => s.name === program.statusName);
        this.form.patchValue({
          name: program.name,
          description: program.description ?? '',
          statusId: status?.id ?? '',
          estimatedTime: program.estimatedTime,
        });
      }
    }
  }

  getSchedulesForDay(schedules: ProgramScheduleDto[], dayNumber: number): ProgramScheduleDto[] {
    return schedules.filter((s) => s.dayNumber === dayNumber);
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();

    if (this.isEdit()) {
      const success = await this.store.updateProgram(this.id()!, {
        name: v.name,
        description: v.description || null,
        statusId: v.statusId,
        estimatedTime: v.estimatedTime,
      });
      if (success) this.router.navigate(['/programs']);
    } else {
      const success = await this.store.createProgram({
        name: v.name,
        description: v.description || null,
        statusId: v.statusId,
        estimatedTime: v.estimatedTime,
      });
      if (success) this.router.navigate(['/programs']);
    }
  }

  async onAddWeeklyWorkout() {
    const programId = this.id();
    if (!programId || !this.newSchedule.workoutId) return;

    const success = await this.store.addWeeklyWorkout(programId, {
      workoutId: this.newSchedule.workoutId,
      weekNumber: this.newSchedule.weekNumber,
      dayNumber: this.newSchedule.dayNumber,
    });

    if (success) {
      this.showAddDialog = false;
      this.newSchedule = { workoutId: '', weekNumber: 1, dayNumber: 1 };
    }
  }

  onBack() { this.router.navigate(['/programs']); }
}
