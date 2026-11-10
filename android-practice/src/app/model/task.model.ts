export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: number;
  title: string;
  content: string;
  status: TaskStatus;
  createDate: string;
  updateDate?: string;
  photos: string[];
}