import { Injectable, signal } from '@angular/core';
import { WorkItem } from '../models/work-item.model';

@Injectable({
  providedIn: 'root'
})
export class WorkItemService {
  private allWorkItems = signal<WorkItem[]>([
    { id: 1, title: '用戶管理系統前端開發', type: '一般專案', priority: 'high', dueDate: '2025-08-30', status: '開發中', source: 'project' },
    { id: 2, title: '客戶關係管理系統重構', type: '重大需求', priority: 'medium', dueDate: '2025-09-15', status: '專管確認中', source: 'project' },
    { id: 3, title: '修正登入頁面樣式問題', type: '需求單', priority: 'medium', dueDate: '2025-08-27', status: 'UAT測試中', source: 'request' },
    { id: 4, title: '新增匯出功能需求', type: '需求單', priority: 'low', dueDate: '2025-09-01', status: '需求梳理中', source: 'request' },
    { id: 5, title: '優化資料庫查詢效能', type: '代辦事項', priority: 'low', dueDate: '2025-08-30', status: '開發準備中', source: 'todo' },
    { id: 6, title: '更新 API 文件', type: '代辦事項', priority: 'high', dueDate: '2025-08-29', status: '需關注', source: 'todo' }
  ]);

  private todayWorkItems = signal<WorkItem[]>([
    { id: 2, title: '修正登入頁面樣式問題', type: '需求單', priority: 'medium', dueDate: '2025-08-27', status: 'UAT測試中', source: 'request' },
    { id: 4, title: '準備專案進度報告', type: 'Personal Todo', priority: 'medium', dueDate: '2025-08-27', status: '開發中', source: 'personal' },
    { id: 7, title: '團隊會議：系統架構討論', type: '會議', priority: 'high', dueDate: '2025-08-27', status: '已安排', source: 'meeting' }
  ]);

  getAllWorkItems() {
    console.log("getAllWorkItems");
    
    return this.allWorkItems.asReadonly();
  }

  getTodayWorkItems() {
    return this.todayWorkItems.asReadonly();
  }

  getWorkItemsByType(type: string) {
    if (type === 'all') {
      return this.allWorkItems.asReadonly();
    }
    return signal(this.allWorkItems().filter(item => item.source === type)).asReadonly();
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'border-l-red-400';
      case 'medium': return 'border-l-cyan-500';
      case 'low': return 'border-l-green-400';
      default: return 'border-l-gray-500';
    }
  }

  getTypeIcon(source: string): string {
    switch (source) {
      case 'project': return '🚀';
      case 'request': return '📋';
      case 'todo': return '📝';
      case 'personal': return '⭐';
      case 'meeting': return '👥';
      default: return '📌';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case '需求梳理中': return 'bg-pink-300 text-gray-900';
      case '專管確認中': return 'bg-violet-300 text-gray-900';
      case '資訊PM預估時程中': return 'bg-sky-300 text-gray-900';
      case '開發準備中': return 'bg-teal-400 text-gray-900';
      case '開發中': return 'bg-blue-300 text-gray-900';
      case '環境部署中': return 'bg-slate-400 text-gray-900';
      case 'UAT測試中': return 'bg-orange-300 text-gray-900';
      case '系統上線中': return 'bg-indigo-400 text-white';
      case '已上線': return 'bg-cyan-600 text-white';
      case '已撤案': return 'bg-gray-400 text-gray-900';
      case '已結案': return 'bg-emerald-400 text-gray-900';
      case '需關注': return 'bg-red-400 text-white';
      case '已安排': return 'bg-violet-300 text-gray-900';
      default: return 'bg-gray-600 text-gray-300';
    }
  }

  getProjectTypeColor(type: string): string {
    if (type === '重大需求') return 'text-purple-300';
    if (type === '一般專案') return 'text-sky-500';
    return 'text-gray-400';
  }
}
