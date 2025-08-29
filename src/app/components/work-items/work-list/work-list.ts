import { Component, signal, inject } from '@angular/core';
import { WorkItemService } from '../../../services/work-item';

@Component({
  selector: 'app-work-list',
  imports: [],
  templateUrl: './work-list.html',
  styleUrl: './work-list.scss'
})
export class WorkListComponent {
  private workItemService = inject(WorkItemService);
  
  leftOuterCollapsed = signal(false);
  activeTab = signal('all');
  
  allWorkItems = this.workItemService.getAllWorkItems();
  
  tabs = [
    { key: 'all', label: '全部', count: 6 },
    { key: 'project', label: '專案', count: 2 },
    { key: 'request', label: '需求單', count: 2 },
    { key: 'todo', label: '代辦', count: 2 }
  ];

  toggleCollapse() {
    this.leftOuterCollapsed.update(collapsed => !collapsed);
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

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
