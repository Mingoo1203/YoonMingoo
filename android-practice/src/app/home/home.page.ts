import { Router } from '@angular/router';
import { Component, OnInit,ChangeDetectorRef,OnDestroy,  NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';
import { Network } from '@capacitor/network';
import type { PluginListenerHandle } from '@capacitor/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonModal,
  IonInput,
  IonTextarea,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  AlertController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  add,
  searchOutline,
  filterOutline,
  imageOutline,
  trashOutline,
  cloudOfflineOutline
} from 'ionicons/icons';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TaskService } from '../services/task';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonFab,
    IonFabButton,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonModal,
    IonInput,
    IonTextarea,
    ReactiveFormsModule,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonItem,
  ]
})
export class HomePage implements OnInit, OnDestroy {

  tasks: Task[] = [];
  searchText = '';
  isSearching = false;
  sortAscending = true;
  errorMessage = '';
  isAddModalOpen = false;
  taskForm: FormGroup;
selectedPhotos: string[] = [];
isOffline = false;
private networkListener?: PluginListenerHandle;
readonly MAX_PHOTOS = 3;
readonly MAX_PHOTO_SIZE = 500 * 1024;

  constructor(private taskService: TaskService,  private fb: FormBuilder,
    private toastController: ToastController, private router: Router,
    private alertController: AlertController, private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    addIcons({
      add,
      searchOutline,
      filterOutline,
      imageOutline,
      trashOutline,
      cloudOfflineOutline
    });
    this.taskForm = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(200)
    ]],
    content: ['', [
      Validators.required,
      Validators.maxLength(400)
    ]]
  });
  }

async ngOnInit(): Promise<void> {
  await Promise.all([
    this.loadTasks(),
    this.initializeNetwork()
  ]);
}
async loadTasks(): Promise<void> {
  try {
    this.errorMessage = '';

    await this.taskService.getInitialTasks();

    // 서비스에 저장된 최신 목록 가져오기
    this.tasks = [...this.taskService.getTasks()];

    // 화면 즉시 갱신
    this.cdr.detectChanges();

    console.log('불러온 게시글:', this.tasks);

  } catch (error) {
    console.error('게시글 불러오기 실패:', error);
    this.errorMessage = '데이터를 불러오지 못했습니다.';
    this.cdr.detectChanges();
  }
}

  get filteredTasks(): Task[] {
    return this.tasks
      .filter(task =>
        task.title.toLowerCase().includes(
          this.searchText.toLowerCase()
        ) ||
        task.content.toLowerCase().includes(
          this.searchText.toLowerCase()
        )
      )
      .sort((a, b) =>
        this.sortAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
  }

  async handleRefresh(event: any): Promise<void> {
  try {
    await this.loadTasks();
  } finally {
    await event.target.complete();
  }
}
  openAddModal(): void {
  this.taskForm.reset({
    title: '',
    content: ''
  });

  this.selectedPhotos = [];
  this.isAddModalOpen = true;
}


closeAddModal(): void {
  this.isAddModalOpen = false;
}
  openDetail(task: Task): void {
  this.router.navigate(
    ['/task-detail', task.id],
    { state: { task } }
  );
}


async submitTask(): Promise<void> {
  if (this.taskForm.invalid) {
    return;
  }

  const title = this.taskForm.value.title;
  const content = this.taskForm.value.content;

  try {
    // 게시글과 사진 저장
    this.taskService.addTask(
      title,
      content,
      this.selectedPhotos
    );

    // 목록 갱신
    this.tasks = [...this.taskService.getTasks()];

    // 등록 성공 후 모달 닫기
    this.closeAddModal();
    this.selectedPhotos = [];
    this.cdr.detectChanges();

    const toast = await this.toastController.create({
      message: '게시글이 등록되었습니다.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();

  } catch (error) {
    console.error('게시글 저장 실패:', error);

    const toast = await this.toastController.create({
      message: '게시글 저장에 실패했습니다. 사진 용량을 확인해주세요.',
      duration: 2500,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }
}


async confirmSwipeDelete(
  task: Task,
  slidingItem: IonItemSliding
): Promise<void> {

  try {
    await Haptics.impact({
      style: ImpactStyle.Light
    });
  } catch (error) {
    console.warn('햅틱 사용 불가:', error);
  }

  const alert = await this.alertController.create({
    header: '게시글 삭제',
    message: `"${task.title}" 게시글을 삭제하시겠습니까?`,
    buttons: [
      {
        text: '취소',
        role: 'cancel'
      },
      {
        text: '삭제',
        role: 'destructive',
        handler: () => {
          void this.deleteFromList(task.id);
        }
      }
    ]
  });

  await alert.present();
  await alert.onDidDismiss();
  await slidingItem.close();
}

async deleteFromList(id: number): Promise<void> {
  try {
    this.taskService.deleteTask(id);

    this.tasks = [...this.taskService.getTasks()];
    this.cdr.detectChanges();

    const toast = await this.toastController.create({
      message: '게시글이 삭제되었습니다.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();

  } catch (error) {
    console.error('게시글 삭제 실패:', error);

    const toast = await this.toastController.create({
      message: '게시글 삭제에 실패했습니다.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }
}


async addPhoto(): Promise<void> {

  // 최대 첨부 개수 확인
  if (this.selectedPhotos.length >= this.MAX_PHOTOS) {
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

    // 이미지 압축
    const compressedPhoto = await this.compressImage(photo.dataUrl);

    // 실제 이미지 데이터 크기 계산
    const base64 = compressedPhoto.split(',')[1];

    if (!base64) {
      throw new Error('사진 데이터를 읽을 수 없습니다.');
    }

    const photoSize =
      Math.floor(base64.length * 3 / 4) -
      (base64.endsWith('==') ? 2 :
       base64.endsWith('=') ? 1 : 0);

    // 사진 1장당 500KB 제한
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
  this.selectedPhotos = [
    ...this.selectedPhotos,
    compressedPhoto
  ];

  this.cdr.detectChanges();
});

    console.log(
      '압축된 사진 크기:',
      (photoSize / 1024).toFixed(2),
      'KB'
    );

  } catch (error) {
    console.error('사진 선택 또는 압축 실패:', error);
  }
}

removePhoto(index: number): void {
  this.selectedPhotos = this.selectedPhotos.filter(
    (_, i) => i !== index
  );

  this.cdr.detectChanges();
}

ionViewWillEnter(): void {
  this.tasks = [...this.taskService.getTasks()];
  this.cdr.detectChanges();
}

async initializeNetwork(): Promise<void> {
  try {
    // 인터넷 연결 상태 변경 감지
    this.networkListener = await Network.addListener(
      'networkStatusChange',
      (status) => {
        this.isOffline = !status.connected;
        this.cdr.detectChanges();
      }
    );

    // 현재 연결 상태 확인
    const status = await Network.getStatus();

    this.isOffline = !status.connected;
    this.cdr.detectChanges();

  } catch (error) {
    console.error('네트워크 상태 확인 실패:', error);
  }
}

ngOnDestroy(): void {
  void this.networkListener?.remove();
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

      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));

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
}
