import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat';

@Component({
  selector: 'app-chat-interface',
  imports: [FormsModule],
  templateUrl: './chat-interface.html',
  styleUrl: './chat-interface.scss'
})
export class ChatInterfaceComponent {
  private chatService = inject(ChatService);
  
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
