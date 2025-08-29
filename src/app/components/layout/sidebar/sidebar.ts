import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  mainNavItems = signal<any[]>([
    { icon: '🏠', label: '首頁', path: '/main', active: false },
    { icon: '📁', label: '專案管理', path: '/main/SystemManagement/List', active: true },
    { icon: '📊', label: '報表分析', path: '/reports', active: false },
    { icon: '👥', label: '團隊管理', path: '/team', active: false }
  ]);

  Array = Array;
}
