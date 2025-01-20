export interface Message {
  id: string;
  author: string;
  time: string;
  createdAt: string;
  title: string;
  content: string;
  isTaskOverdue: boolean;
  hasOverdueItems: boolean;
}