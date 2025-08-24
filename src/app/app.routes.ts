import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'students',
    loadComponent: () =>
      import('./features/alumnos/pages/students-list/students-list.component').then(m => m.StudentsListComponent)
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  }
];
