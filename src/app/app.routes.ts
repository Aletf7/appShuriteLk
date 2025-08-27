import { Routes } from '@angular/router';
import { StudentsListComponent } from './features/alumnos/pages/students-list/students-list.component';
import { VideosListComponent } from './features/videos/pages/videos-list/videos-list.component';
import { AdminPanelComponent } from './features/admin/pages/admin-panel/admin-panel.component';
import { ClassListComponent } from './features/clases/pages/class-list/class-list.component';
import { VideoUploadPage } from './features/videos/pages/video-upload/video-upload.component';
import { VideosGalleryPage } from './features/videos/pages/videos-gallery/videos-gallery.component';
import { StudentProfileComponent } from './features/alumnos/pages/student-profile/student-profile.component';
import { StudentEditComponent } from './features/alumnos/pages/student-edit/student-edit.component';
import { authGuard } from './core/auth/guard/auth.guard';
import { UnauthorizedComponent } from './features/auth/unauthorized/unauthorized.component';
import { LoginPage } from './features/auth/pages/login/login.component';
import { roleGuard } from './core/auth/guard/role.guard';
import { adminRoutes } from './features/admin/admin.routes';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'students', component: StudentsListComponent, canActivate: [roleGuard(['admin'])] },
  { path: 'admin', children: adminRoutes },
  { path: 'videos', component: VideosListComponent,canActivate: [roleGuard(['admin', 'student'])]  },
  { path: 'admin', component: AdminPanelComponent, canActivate: [roleGuard(['admin'])] },
  { path: 'clases', component: ClassListComponent, canActivate: [roleGuard(['admin'])]},
  { path: 'admin/upload', component: VideoUploadPage, canActivate: [roleGuard(['admin'])] },
  { path: 'videos/gallery', component: VideosGalleryPage, canActivate: [roleGuard(['admin'])] },
  { path: 'students/:id', component: StudentProfileComponent, canActivate: [roleGuard(['admin'])] },
  { path: 'students/:id/edit', component: StudentEditComponent, canActivate: [roleGuard(['admin'])] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students' } // Fallback para rutas no válidas
];
