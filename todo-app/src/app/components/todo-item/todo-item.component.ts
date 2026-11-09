import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { Router } from '@angular/router';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular';


@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ],
})
export class TodoItemComponent {

  @Input({ required: true }) todo!: Todo;
 @Output() delete = new EventEmitter<number>();
  constructor(private router: Router){}

  openDetail(): void {
    this.router.navigate(['/todo-detail', this.todo.id]);
  }
  onDelete(): void {
    this.delete.emit(this.todo.id);
  }
}