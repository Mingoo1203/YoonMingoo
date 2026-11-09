
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonModal,
  IonInput,
  IonTextarea,
  ToastController
} from '@ionic/angular';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    ReactiveFormsModule,
    IonModal,
    IonInput,
    IonTextarea
  ]
})
export class TodoDetailPage {

  todo?: Todo;

  isEditModalOpen = false;

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.todo = this.todoService
      .getTodos()
      .find(todo => todo.id === id);

    this.editForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      content: ['', [
        Validators.required
      ]]
    });

  }

  openEditModal(): void {

    if (!this.todo) {
      return;
    }

    this.editForm.patchValue({
      title: this.todo.title,
      content: this.todo.content
    });

    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }
  async saveEdit(): Promise<void> {
  if (!this.todo || this.editForm.invalid) {
    return;
  }

  const updatedTodo: Todo = {
    ...this.todo,
    title: this.editForm.value.title,
    content: this.editForm.value.content
  };

  this.todoService.updateTodo(updatedTodo);

  this.todo = updatedTodo;

  this.closeEditModal();
    const toast = await this.toastController.create({
    message: 'Todo 수정 완료!',
    duration: 2000,
    position: 'bottom',
    color: 'success'
  });

  await toast.present();
}
}
