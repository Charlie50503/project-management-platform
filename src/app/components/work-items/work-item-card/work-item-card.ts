import { Component, Input, inject } from '@angular/core';
import { WorkItem } from '../../../models/work-item.model';
import { WorkItemService } from '../../../services/work-item';
import { LucideAngularModule, Clock } from 'lucide-angular';

@Component({
  selector: 'app-work-item-card',
  imports: [LucideAngularModule],
  templateUrl: './work-item-card.html',
  styleUrl: './work-item-card.scss'
})
export class WorkItemCardComponent {
  @Input({ required: true }) item!: WorkItem;
  
  private workItemService = inject(WorkItemService);
  
  Clock = Clock;

  getPriorityColor(priority: string): string {
    return this.workItemService.getPriorityColor(priority);
  }

  getTypeIcon(source: string): string {
    return this.workItemService.getTypeIcon(source);
  }

  getStatusColor(status: string): string {
    return this.workItemService.getStatusColor(status);
  }

  getProjectTypeColor(type: string): string {
    return this.workItemService.getProjectTypeColor(type);
  }
}