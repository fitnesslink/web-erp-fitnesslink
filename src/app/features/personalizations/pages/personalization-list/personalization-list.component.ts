import { Component, inject, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PersonalizationStore } from '../../store/personalization.store';

@Component({
  selector: 'app-personalization-list',
  standalone: true,
  imports: [
    Card,
    Tag,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    PageHeaderComponent,
    EmptyStateComponent,
  ],
  templateUrl: './personalization-list.component.html',
  styleUrl: './personalization-list.component.scss',
})
export class PersonalizationListComponent implements OnInit {
  readonly store = inject(PersonalizationStore);

  ngOnInit() {
    this.store.loadAll();
  }
}
