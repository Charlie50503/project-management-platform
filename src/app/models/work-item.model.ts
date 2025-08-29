export interface WorkItem {
  id: number;
  title: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: string;
  source: 'project' | 'request' | 'todo' | 'personal' | 'meeting';
}

export interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  time: string;
}

export interface ChatHistory {
  id: number;
  title: string;
  time: string;
  preview: string;
  active: boolean;
}

export interface NavItem {
  icon: string;
  label: string;
  path: string;
  active: boolean;
}