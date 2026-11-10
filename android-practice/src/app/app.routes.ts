import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'task-detail/:id',
    loadComponent: () =>
      import('./pages/task-detail/task-detail.page')
        .then(m => m.TaskDetailPage)
  }
];