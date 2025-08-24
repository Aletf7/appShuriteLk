import { Routes } from '@angular/router';
import { StudentsListComponent } from './features/alumnos/pages/students-list/students-list.component';
import { VideosListComponent } from './features/videos/pages/videos-list/videos-list.component';
import { AdminPanelComponent } from './features/admin/pages/admin-panel/admin-panel.component';
import { ClassListComponent } from './features/clases/pages/class-list/class-list.component';

export const routes: Routes = [
  { path: 'students', component: StudentsListComponent },
  { path: 'videos', component: VideosListComponent  },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'clases', component: ClassListComponent},
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students' } // Fallback para rutas no válidas
];
