import { Routes } from '@angular/router';
import { StudentsListComponent } from './features/alumnos/pages/students-list/students-list.component';
import { VideosListComponent } from './features/videos/pages/videos-list/videos-list.component';
import { AdminPanelComponent } from './features/admin/pages/admin-panel/admin-panel.component';
import { ClassListComponent } from './features/clases/pages/class-list/class-list.component';
import { VideoUploadPage } from './features/videos/pages/video-upload/video-upload.component';
import { VideosGalleryPage } from './features/videos/pages/videos-gallery/videos-gallery.component';
import { StudentProfileComponent } from './features/alumnos/pages/student-profile/student-profile.component';
import { StudentEditComponent } from './features/alumnos/pages/student-edit/student-edit.component';

export const routes: Routes = [
  { path: 'students', component: StudentsListComponent },
  { path: 'videos', component: VideosListComponent  },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'clases', component: ClassListComponent},
  { path: 'admin/upload', component: VideoUploadPage },
  { path: 'videos/gallery', component: VideosGalleryPage },
  { path: 'students/:id', component: StudentProfileComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students' } // Fallback para rutas no válidas
];
