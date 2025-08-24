import { Routes } from '@angular/router';
// import { KataGalleryComponent } from './features/videos/kata-gallery/kata-gallery.component';
// import { VideoUploadComponent } from './features/videos/video-upload/video-upload.component';
import { StudentsListComponent } from './features/alumnos/pages/students-list/students-list.component';

export const routes: Routes = [
  { path: 'students', component: StudentsListComponent },
  // { path: 'videos', component: KataGalleryComponent },
  // { path: 'admin', component: VideoUploadComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students' } // Fallback para rutas no válidas
];
