import { Component, signal, inject } from '@angular/core';
import { WorkItemService } from '../../../services/work-item';
import { WorkItemCardComponent } from '../work-item-card/work-item-card';
import { LucideAngularModule, ChevronRight, ChevronLeft, Folder } from 'lucide-angular';

@Component({
  selector: 'app-work-list',
  imports: [LucideAngularModule, WorkItemCardComponent],
  templateUrl: './work-list.html',
  styleUrl: './work-list.scss'
})
export class WorkListComponent {
  private workItemService = inject(WorkItemService);
  
  leftOuterCollapsed = signal(false);
  activeTab = signal('all');
  
  ChevronRight = ChevronRight;
  ChevronLeft = ChevronLeft;
  Folder = Folder;
  
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


}
