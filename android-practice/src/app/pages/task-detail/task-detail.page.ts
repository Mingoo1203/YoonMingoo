
import { Component , ChangeDetectorRef, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute , Router} from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonBadge,
  ToastController,
  IonModal,
  IonInput,
  IonTextarea,
  IonAlert,
  IonIcon,
  IonItem,
  IonList,
  IonPopover
} from '@ionic/angular';

import { Clipboard } from '@capacitor/clipboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  ellipsisVertical,
  createOutline,
  trashOutline,
  imageOutline
} from 'ionicons/icons';
import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonBadge,
    ReactiveFormsModule,
    IonModal,
    IonInput,
    IonTextarea,
    IonAlert,
    IonIcon,
    IonItem,
    IonList,
    IonPopover
  ]
})
export class TaskDetailPage {

  task?: Task;
  isEditModalOpen = false;
  isDeleteAlertOpen = false;
  isMenuOpen = false;
  editPhotos: string[] = [];
  editForm: FormGroup;
  selectedPhoto: string | null = null;
  isPhotoViewerOpen = false;
readonly MAX_PHOTOS = 3;
readonly MAX_PHOTO_SIZE = 500 * 1024;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {addIcons({
    ellipsisVertical,
    createOutline,
    trashOutline,
    imageOutline
  });

  this.editForm = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(200)
    ]],
    content: ['', [
      Validators.required,
      Validators.maxLength(400)
    ]]
  });}

  

ionViewWillEnter(): void {

  const id = Number(
    this.route.snapshot.paramMap.get('id')
  );

  const savedTask = this.taskService.getTaskById(id);

  const stateTask = history.state.task as Task | undefined;

  this.task = savedTask ??
    (stateTask?.id === id ? stateTask : undefined);

  if (savedTask) {
    this.task = this.taskService.startTask(id);
  }

  // 변경된 데이터를 화면에 즉시 반영
  this.cdr.detectChanges();

  console.log('게시글 ID:', id);
  console.log('게시글 데이터:', this.task);
}

async copyContent(): Promise<void> {
  if (!this.task) {
    return;
  }

  try {
    await Clipboard.write({
      string: this.task.content
    });

    const toast = await this.toastController.create({
      message: '본문이 복사되었습니다.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();

  } catch (error) {
    console.error('복사 실패:', error);
  }
}

async completeTask(): Promise<void> {
  if (!this.task || this.task.status === 'DONE') {
    return;
  }

  const updatedTask = this.taskService.completeTask(
    this.task.id
  );

  if (!updatedTask) {
    return;
  }

  this.task = updatedTask;

  // 화면 즉시 갱신
  this.cdr.detectChanges();

  // 모바일 기기에서 진동
  try {
    await Haptics.impact({
      style: ImpactStyle.Medium
    });
  } catch (error) {
    console.warn('햅틱 사용 불가:', error);
  }

  const toast = await this.toastController.create({
    message: '작업이 완료되었습니다.',
    duration: 2000,
    position: 'bottom',
    color: 'success'
  });

  await toast.present();
}
openEditModal(): void {
  if (!this.task) {
    return;
  }

  this.editForm.patchValue({
    title: this.task.title,
    content: this.task.content
  });

  this.editPhotos = [...this.task.photos];

  this.isEditModalOpen = true;
}

closeEditModal(): void {
  this.isEditModalOpen = false;
}


async submitEdit(): Promise<void> {
  if (!this.task || this.editForm.invalid) {
    return;
  }

  const { title, content } = this.editForm.value;

  try {
    // 수정할 게시글 ID 보관
    const taskId = this.task.id;

    // 제목, 내용, 사진 수정
    this.taskService.updateTask(
      taskId,
      title,
      content,
      this.editPhotos
    );

    // 수정된 게시글 다시 불러오기
    this.task = this.taskService.getTaskById(taskId);

    // 수정 모달 닫기
    this.closeEditModal();

    // 화면 즉시 갱신
    this.cdr.detectChanges();

    const toast = await this.toastController.create({
      message: '게시글이 수정되었습니다.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();

  } catch (error) {
    console.error('게시글 수정 실패:', error);

    const toast = await this.toastController.create({
      message: '게시글 수정에 실패했습니다.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }
}

openDeleteAlert(): void {
  this.isMenuOpen = false;
  this.isDeleteAlertOpen = true;
}

async confirmDelete(): Promise<void> {
  if (!this.task) {
    return;
  }

  this.taskService.deleteTask(this.task.id);
  this.isDeleteAlertOpen = false;

  const toast = await this.toastController.create({
    message: '게시글이 삭제되었습니다.',
    duration: 2000,
    position: 'bottom',
    color: 'success'
  });

  await toast.present();

  await this.router.navigate(['/home']);
}

async addEditPhoto(): Promise<void> {

  // 사진 개수 제한
  if (this.editPhotos.length >= this.MAX_PHOTOS) {
    const toast = await this.toastController.create({
      message: `사진은 최대 ${this.MAX_PHOTOS}장까지 첨부할 수 있습니다.`,
      duration: 2000,
      position: 'bottom',
      color: 'warning'
    });

    await toast.present();
    return;
  }

  try {
    const photo = await Camera.getPhoto({
      quality: 50,
      width: 600,
      height: 600,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if (!photo.dataUrl) {
      return;
    }

    // 기존 이미지 압축 함수 사용
    const compressedPhoto = await this.compressImage(photo.dataUrl);

    // Data URL의 Base64 데이터 크기 계산
    const base64 = compressedPhoto.split(',')[1];

    if (!base64) {
      throw new Error('사진 데이터를 읽을 수 없습니다.');
    }

    const photoSize = Math.floor(
      base64.length * 3 / 4
    ) - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);

    // 사진 용량 제한
    if (photoSize > this.MAX_PHOTO_SIZE) {
      const toast = await this.toastController.create({
        message: '사진 용량이 500KB를 초과했습니다.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });

      await toast.present();
      return;
    }

 this.ngZone.run(() => {
  this.editPhotos = [
    ...this.editPhotos,
    compressedPhoto
  ];

  this.cdr.detectChanges();
});
    console.log(
      '사진 크기:',
      (photoSize / 1024).toFixed(2),
      'KB'
    );

  } catch (error) {
    console.error('사진 선택 또는 압축 실패:', error);
  }
}

removeEditPhoto(index: number): void {
  this.editPhotos = this.editPhotos.filter(
    (_, i) => i !== index
  );

  this.cdr.detectChanges();
}

private compressImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const maxSize = 600;

      const scale = Math.min(
        1,
        maxSize / Math.max(img.width, img.height)
      );

      const canvas = document.createElement('canvas');

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas 생성 실패'));
        return;
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };

    img.onerror = () => reject(new Error('이미지 불러오기 실패'));
    img.src = dataUrl;
  });
}
openPhotoViewer(photo: string): void {
  this.selectedPhoto = photo;
  this.isPhotoViewerOpen = true;
}

closePhotoViewer(): void {
  this.isPhotoViewerOpen = false;
}
}
