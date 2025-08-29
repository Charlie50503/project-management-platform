import { Injectable, signal } from '@angular/core';
import { ChatMessage, ChatHistory } from '../models/work-item.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatHistory = signal<ChatHistory[]>([
    { id: 1, title: '今日工作安排', time: '10:30', preview: '請幫我整理今天的工作重點...', active: true },
    { id: 2, title: '專案進度查詢', time: '昨天', preview: '查詢用戶管理系統的開發進度', active: false },
    { id: 3, title: '技術問題討論', time: '8/25', preview: '關於 Angular 17 信號的使用...', active: false },
    { id: 4, title: '需求確認會議', time: '8/24', preview: '與產品經理討論新功能需求...', active: false }
  ]);

  private messages = signal<ChatMessage[]>([
    { id: 1, type: 'user', content: '請幫我整理今天的工作重點', time: '10:30' },
    { id: 2, type: 'ai', content: '根據你的工作項目，今天的重點包括：\n\n1. 修正登入頁面樣式問題（需求單，中優先級）- UAT測試中\n2. 準備專案進度報告（個人代辦，中優先級）\n3. 團隊會議：系統架構討論（會議，高優先級）\n\n建議先處理登入頁面問題，因為這可能影響其他開發者的工作。', time: '10:31' }
  ]);

  getChatHistory() {
    return this.chatHistory.asReadonly();
  }

  getMessages() {
    return this.messages.asReadonly();
  }

  addMessage(content: string) {
    const newMessage: ChatMessage = {
      id: this.messages().length + 1,
      type: 'user',
      content,
      time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.update(messages => [...messages, newMessage]);
  }

  setActiveChat(chatId: number) {
    this.chatHistory.update(history => 
      history.map(chat => ({ ...chat, active: chat.id === chatId }))
    );
  }
}
