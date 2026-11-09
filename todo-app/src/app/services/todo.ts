import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // localStorage에서 사용할 저장소 이름
  private storageKey = 'todos';

  // Todo 데이터를 보관할 배열
  private todos: Todo[] = [];

  constructor() {
    // 서비스가 만들어질 때 저장된 데이터 불러오기
    const savedTodos = localStorage.getItem(this.storageKey);

    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  getTodos(): Todo[] {
    return this.todos.map(todo => ({ ...todo }));
  }

  addTodo(todo: Todo): void {
    this.todos = [...this.todos, { ...todo }];

    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.todos)
    );
  }
  updateTodo(updatedTodo: Todo): void {
  this.todos = this.todos.map(todo =>
    todo.id === updatedTodo.id ? { ...updatedTodo } : todo
  );

  this.saveTodos();
}

deleteTodo(id: number): void {
  this.todos = this.todos.filter(todo => todo.id !== id);

  this.saveTodos();
}
}