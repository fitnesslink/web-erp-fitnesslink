import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { PersonalizationDto, UserPersonalizationDto } from '../models/personalization.model';

@Injectable({ providedIn: 'root' })
export class PersonalizationService {
  private api = inject(ApiService);
  private path = '/api/v1/personalization';

  getAll(): Observable<PersonalizationDto[]> {
    return this.api.get<PersonalizationDto[]>(this.path);
  }

  getUserPersonalizations(userId: string): Observable<UserPersonalizationDto[]> {
    return this.api.get<UserPersonalizationDto[]>(`${this.path}/user/${userId}`);
  }

  getMyPersonalizations(): Observable<UserPersonalizationDto[]> {
    return this.api.get<UserPersonalizationDto[]>(`${this.path}/me`);
  }
}
