import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ClassificationService } from '../services/classification.service';
import {
  AnatomyDto,
  ContentStatusDto,
  EquipmentDto,
  RpeDto,
  TrainingLevelDto,
} from '../models/classification.model';

@Injectable({ providedIn: 'root' })
export class ClassificationStore {
  private service = inject(ClassificationService);

  readonly anatomy = signal<AnatomyDto[]>([]);
  readonly equipment = signal<EquipmentDto[]>([]);
  readonly trainingLevels = signal<TrainingLevelDto[]>([]);
  readonly contentStatuses = signal<ContentStatusDto[]>([]);
  readonly rpeScales = signal<RpeDto[]>([]);
  readonly loaded = signal(false);

  async loadAll(): Promise<void> {
    if (this.loaded()) return;

    const [anatomy, equipment, trainingLevels, contentStatuses, rpeScales] =
      await Promise.all([
        firstValueFrom(this.service.getAnatomy()),
        firstValueFrom(this.service.getEquipment()),
        firstValueFrom(this.service.getTrainingLevels()),
        firstValueFrom(this.service.getContentStatuses()),
        firstValueFrom(this.service.getRpeScales()),
      ]);

    this.anatomy.set(anatomy);
    this.equipment.set(equipment);
    this.trainingLevels.set(trainingLevels);
    this.contentStatuses.set(contentStatuses);
    this.rpeScales.set(rpeScales);
    this.loaded.set(true);
  }
}
