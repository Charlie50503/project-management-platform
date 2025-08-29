import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkItemService } from '../../../services/work-item';
import { LucideAngularModule, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar, CheckSquare, Plus, Clock } from 'lucide-angular';

@Component({
  selector: 'app-calendar-widget',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './calendar-widget.html',
  styleUrl: './calendar-widget.scss'
})
export class CalendarWidgetComponent {
  private workItemService = inject(WorkItemService);
  
  rightSidebarCollapsed = signal(false);
  calendarCollapsed = signal(false);
  todayWorkCollapsed = signal(false);
  showNewTodo = signal(false);
  newTodo = signal('');
  selectedDate = signal(new Date());
  
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

  generateCalendar(): (number | null)[] {
    const date = this.selectedDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days: (number | null)[] = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    const selected = this.selectedDate();
    return day === today.getDate() && 
           selected.getMonth() === today.getMonth() && 
           selected.getFullYear() === today.getFullYear();
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
