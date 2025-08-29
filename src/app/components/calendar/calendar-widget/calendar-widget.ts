import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkItemService } from '../../../services/work-item';
import { LucideAngularModule, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar, CheckSquare, Plus, Clock } from 'lucide-angular';
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
  
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  ChevronDown = ChevronDown;
  ChevronUp = ChevronUp;
  Calendar = Calendar;
  CheckSquare = CheckSquare;
  Plus = Plus;
  Clock = Clock;
  
  todayWorkItems = this.workItemService.getTodayWorkItems();

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
      // 這裡可以添加新的 todo 邏輯
      this.showNewTodo.set(false);
      this.newTodo.set('');
    }
  }

  cancelNewTodo() {
    this.showNewTodo.set(false);
    this.newTodo.set('');
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
