import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat';
import { LucideAngularModule, MessageCircle, ChevronRight, ChevronLeft, Plus, Paperclip, Mic, Send, BarChart3, Calendar, Star } from 'lucide-angular';

@Component({
  selector: 'app-chat-interface',
  imports: [FormsModule, LucideAngularModule
  ],
  templateUrl: './chat-interface.html',
  styleUrl: './chat-interface.scss'
})
export class ChatInterfaceComponent {
  private chatService = inject(ChatService);
  MessageCircle = MessageCircle;
  ChevronRight = ChevronRight;
  ChevronLeft = ChevronLeft;
  Plus = Plus;
  Paperclip = Paperclip;
  Mic = Mic;
  Send = Send;
  BarChart3 = BarChart3;
  Calendar = Calendar;
  Star = Star;
  leftInnerCollapsed = signal(false);
  chatMessage = signal('');

  chatHistory = this.chatService.getChatHistory();
  messages = this.chatService.getMessages();

  toggleCollapse() {
    this.leftInnerCollapsed.update(collapsed => !collapsed);
  }

  sendMessage() {
    const message = this.chatMessage().trim();
    if (message) {
      this.chatService.addMessage(message);
      this.chatMessage.set('');
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  setActiveChat(chatId: number) {
    this.chatService.setActiveChat(chatId);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('zh-TW');
  }
}
