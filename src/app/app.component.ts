import { Component } from '@angular/core';
import { StudentsListComponent } from './features/alumnos/pages/students-list/students-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
