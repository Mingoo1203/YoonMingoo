import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'todo-detail/:id',
  loadComponent: () =>
    import('./pages/todo-detail/todo-detail.page')
      .then(m => m.TodoDetailPage)
  }
];
