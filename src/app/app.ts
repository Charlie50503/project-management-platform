import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header';
import { SidebarComponent } from './components/layout/sidebar/sidebar';
import { WorkListComponent } from './components/work-items/work-list/work-list';
import { ChatInterfaceComponent } from './components/chat/chat-interface/chat-interface';
import { CalendarWidgetComponent } from './components/calendar/calendar-widget/calendar-widget';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    WorkListComponent,
    ChatInterfaceComponent,
    CalendarWidgetComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = '專案管理平台';
  
  getCurrentDateTime(): string {
    return new Date().toLocaleString('zh-TW');
  }
}
