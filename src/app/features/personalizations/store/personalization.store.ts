import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PersonalizationDto } from '../models/personalization.model';
import { PersonalizationService } from '../services/personalization.service';

@Injectable({ providedIn: 'root' })
export class PersonalizationStore {
  private service = inject(PersonalizationService);

  readonly items = signal<PersonalizationDto[]>([]);
  readonly loading = signal(false);

  async loadAll(): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.service.getAll());
      this.items.set(result);
    } catch {
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
