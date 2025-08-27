import { Routes } from '@angular/router';
import { roleGuard } from 'src/app/core/auth/guard/role.guard';
import { VideoAdminTableComponent } from './pages/video-admin-table/video-admin-table.component';
import { StudentsListComponent } from '../alumnos/pages/students-list/students-list.component';
import { VideoUploadPage } from '../videos/pages/video-upload/video-upload.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UserCreatePageComponent } from './pages/user-create-page/user-create-page.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate: [roleGuard(['admin'])],
    children: [
      { path: 'videos', component: VideoAdminTableComponent },
      { path: 'upload', component: VideoUploadPage },
      { path: 'students', component: StudentsListComponent },
      { path: 'create-user', component: UserCreatePageComponent }
    ]
  }
];
