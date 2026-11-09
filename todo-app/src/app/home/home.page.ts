import { Component } from '@angular/core';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ChangeDetectorRef, NgZone} from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonInput,
  IonTextarea,
  ToastController,
  AlertController,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular';

import { TodoService } from '../services/todo';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    TodoItemComponent,
    IonButtons,
    IonButton,
    IonIcon,
    IonModal,
    ReactiveFormsModule,
    IonInput,
    IonTextarea,
    IonRefresher,
    IonRefresherContent
  ]
})
export class HomePage {

  todos: Todo[] = [];
  isAddModalOpen = false;

  todoForm : FormGroup;

  formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}


  openAddModal(): void {
     this.todoForm.reset();
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  async submitTodo(): Promise<void> {
    if(this.todoForm.invalid){
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title : this.todoForm.value.title,
      content: this.todoForm.value.content,
      createdAt: this.formatDate(new Date())
    };

    this.todoService.addTodo(newTodo);

    this.todos = this.todoService.getTodos();

    this.closeAddModal();

    const toast = await this.toastController.create({
      message: 'Todo 등록 완료',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();

  }
async showDeleteToast(): Promise<void> {
  const toast = await this.toastController.create({
    message: 'Todo 삭제 완료!',
    duration: 2000,
    position: 'bottom',
    color: 'success'
  });

  await toast.present();
}
ionViewWillEnter(): void {
  this.ngZone.run(() => {
  this.todos = this.todoService.getTodos();
  this.cdr.detectChanges();
  });
}
  constructor(private todoService: TodoService,private formBuilder: FormBuilder,
     private toastController : ToastController, private cdr: ChangeDetectorRef,
    private alertController: AlertController, private ngZone: NgZone) {

    this.todos = this.todoService.getTodos();
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      content: ['', [Validators.required]]
    });
  }
async confirmDelete(id: number): Promise<void> {

  const alert = await this.alertController.create({
    header: 'Todo 삭제',
    message: '정말 삭제하시겠습니까?',
    buttons: [
      {
        text: '취소',
        role: 'cancel'
      },
      {
        text: '삭제',
        role: 'destructive',
        handler: () => {
          this.ngZone.run(() => {
          this.todoService.deleteTodo(id);

          this.todos = this.todoService.getTodos();

          this.cdr.detectChanges();
          });

          this.showDeleteToast();
        }
      }
    ]
  });

  await alert.present();
}
handleRefresh(event: CustomEvent): void {

  // Todo 목록을 다시 불러오기
  this.todos = this.todoService.getTodos();

  // Angular 화면 갱신
  this.cdr.detectChanges();

  // 새로고침 애니메이션 종료
  (event.target as HTMLIonRefresherElement).complete();
}
}