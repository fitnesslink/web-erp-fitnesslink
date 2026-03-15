import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import {
  AnatomyDto,
  ContentStatusDto,
  EquipmentDto,
  RpeDto,
  TrainingLevelDto,
} from '../models/classification.model';

@Injectable({ providedIn: 'root' })
export class ClassificationService {
  private api = inject(ApiService);
  private path = '/api/v1/classification';

  getAnatomy(): Observable<AnatomyDto[]> {
    return this.api.get<AnatomyDto[]>(`${this.path}/anatomy`);
  }

  getEquipment(): Observable<EquipmentDto[]> {
    return this.api.get<EquipmentDto[]>(`${this.path}/equipment`);
  }

  getTrainingLevels(): Observable<TrainingLevelDto[]> {
    return this.api.get<TrainingLevelDto[]>(`${this.path}/training-levels`);
  }

  getContentStatuses(): Observable<ContentStatusDto[]> {
    return this.api.get<ContentStatusDto[]>(`${this.path}/content-statuses`);
  }

  getRpeScales(): Observable<RpeDto[]> {
    return this.api.get<RpeDto[]>(`${this.path}/rpe-scales`);
  }
}
