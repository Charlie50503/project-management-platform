import { Component, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkItemService } from '../../../services/work-item';
import { LucideAngularModule, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar, CheckSquare, Plus, Clock, Check, Filter, GripVertical, MoreHorizontal } from 'lucide-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override getDateNames(): string[] {
    const dateNames: string[] = [];
    for (let i = 1; i <= 31; i++) {
      dateNames.push(String(i));
    }
    return dateNames;
  }
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY年MM月',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY年MM月',
  },
};

@Component({
  selector: 'app-calendar-widget',
  imports: [FormsModule, LucideAngularModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './calendar-widget.html',
  styleUrl: './calendar-widget.scss',
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class CalendarWidgetComponent {
  private workItemService = inject(WorkItemService);
  
  rightSidebarCollapsed = signal(false);
  calendarCollapsed = signal(false);
  todayWorkCollapsed = signal(false);
  showNewTodo = signal(false);
  newTodo = signal('');
  selected = signal<Date | null>(new Date());
  currentView = signal<'active' | 'completed' | 'all'>('active');
  draggedItem = signal<any>(null);
  
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  ChevronDown = ChevronDown;
  ChevronUp = ChevronUp;
  Calendar = Calendar;
  CheckSquare = CheckSquare;
  Plus = Plus;
  Clock = Clock;
  Check = Check;
  Filter = Filter;
  GripVertical = GripVertical;
  MoreHorizontal = MoreHorizontal;
  
  allTodayWorkItems = this.workItemService.getTodayWorkItems();
  
  activeTodos = computed(() => 
    this.allTodayWorkItems().filter(item => item.status !== 'completed')
  );
  
  completedTodos = computed(() => 
    this.allTodayWorkItems().filter(item => item.status === 'completed')
  );
  
  currentList = computed(() => {
    switch (this.currentView()) {
      case 'active': return this.activeTodos();
      case 'completed': return this.completedTodos();
      case 'all': return this.allTodayWorkItems();
      default: return this.activeTodos();
    }
  });

  toggleSidebar() {
    this.rightSidebarCollapsed.update(collapsed => !collapsed);
  }

  toggleCalendar() {
    this.calendarCollapsed.update(collapsed => !collapsed);
  }

  toggleTodayWork() {
    this.todayWorkCollapsed.update(collapsed => !collapsed);
  }

  toggleNewTodo() {
    this.showNewTodo.update(show => !show);
  }

  addNewTodo() {
    if (this.newTodo().trim()) {
      this.workItemService.addTodoItem({
        id: Date.now(),
        title: this.newTodo().trim(),
        status: 'active',
        type: '代辦事項',
        source: 'todo',
        dueDate: new Date().toISOString().split('T')[0]
      });
      this.showNewTodo.set(false);
      this.newTodo.set('');
    }
  }

  cancelNewTodo() {
    this.showNewTodo.set(false);
    this.newTodo.set('');
  }

  setCurrentView(view: 'active' | 'completed' | 'all') {
    this.currentView.set(view);
  }

  toggleComplete(item: any) {
    this.workItemService.toggleTodoComplete(item.id);
  }

  deleteTodo(item: any) {
    this.workItemService.deleteTodoItem(item.id);
  }

  handleDragStart(event: DragEvent, item: any) {
    this.draggedItem.set(item);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  handleDrop(event: DragEvent, dropTarget: any) {
    event.preventDefault();
    const draggedItem = this.draggedItem();
    if (draggedItem && draggedItem.id !== dropTarget.id) {
      this.workItemService.reorderTodoItems(draggedItem.id, dropTarget.id);
    }
    this.draggedItem.set(null);
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
