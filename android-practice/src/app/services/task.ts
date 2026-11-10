
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Task } from '../model/task.model';

interface ApiPost {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl =
    'https://jsonplaceholder.typicode.com/posts?_limit=10';

  private storageKey = 'task-manager-data';
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  async getInitialTasks(): Promise<Task[]> {

    const savedData = localStorage.getItem(this.storageKey);

    // 저장된 데이터가 있으면 API를 다시 요청하지 않음
    if (savedData !== null) {
      this.tasks = JSON.parse(savedData) as Task[];
      return [...this.tasks];
    }

    // 최초 실행 시 API 데이터 가져오기
    const posts = await firstValueFrom(
      this.http.get<ApiPost[]>(this.apiUrl)
    );

  const initialTasks: Task[] = posts.map(post => ({
  id: post.id,
  title: post.title,
  content: post.body,
  status: 'TODO',
  createDate: new Date().toISOString(),
  photos: []
}));

this.saveTasks(initialTasks);

    this.saveTasks(initialTasks);

    return [...this.tasks];
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }
private saveTasks(nextTasks: Task[]): void {
  try {
    const data = JSON.stringify(nextTasks);

    // localStorage에 먼저 저장
    localStorage.setItem(this.storageKey, data);

    // 저장 성공 시에만 메모리 데이터 변경
    this.tasks = nextTasks;

    console.log(
      '게시글 저장 성공:',
      (new Blob([data]).size / 1024).toFixed(2),
      'KB'
    );

  } catch (error) {
    console.error('게시글 저장 실패:', error);

    if (
      error instanceof DOMException &&
      (
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )
    ) {
      throw new Error(
        '저장 공간이 부족합니다. 첨부 사진을 줄인 뒤 다시 시도해 주세요.'
      );
    }

    throw error;
  }
}

addTask(
  title: string,
  content: string,
  photos: string[] = []
): void {
  const newTask: Task = {
    id: Date.now(),
    title,
    content,
    status: 'TODO',
    createDate: new Date().toISOString(),
    photos: [...photos]
  };

  const nextTasks = [newTask, ...this.tasks];

  this.saveTasks(nextTasks);
}


getTaskById(id: number): Task | undefined {

  // 현재 메모리에 데이터가 없다면 localStorage에서 불러오기
  if (this.tasks.length === 0) {
    const savedData = localStorage.getItem(this.storageKey);

    if (savedData !== null) {
      this.tasks = JSON.parse(savedData) as Task[];
    }
  }

  return this.tasks.find(task => task.id === id);
}


startTask(id: number): Task | undefined {
  const task = this.getTaskById(id);

  if (!task) {
    return undefined;
  }

  if (task.status === 'TODO') {
    const updatedTask: Task = {
      ...task,
      status: 'IN_PROGRESS'
    };

    const nextTasks = this.tasks.map(item =>
      item.id === id ? updatedTask : item
    );

    this.saveTasks(nextTasks);

    return { ...updatedTask };
  }

  return { ...task };
}

completeTask(id: number): Task | undefined {
  const task = this.getTaskById(id);

  if (!task) {
    return undefined;
  }

  if (task.status === 'DONE') {
    return { ...task };
  }

  const updatedTask: Task = {
    ...task,
    status: 'DONE',
    updateDate: new Date().toISOString()
  };

  const nextTasks = this.tasks.map(item =>
    item.id === id ? updatedTask : item
  );

  this.saveTasks(nextTasks);

  return { ...updatedTask };
}


updateTask(
  id: number,
  title: string,
  content: string,
  photos?: string[]
): void {

  const nextTasks = this.tasks.map(task => {
    if (task.id !== id) {
      return task;
    }

    return {
      ...task,
      title,
      content,
      photos: photos !== undefined
        ? [...photos]
        : [...task.photos],
      updateDate: new Date().toISOString()
    };
  });

  this.saveTasks(nextTasks);
}


deleteTask(id: number): void {
  const nextTasks = this.tasks.filter(
    task => task.id !== id
  );

  this.saveTasks(nextTasks);
}
}
