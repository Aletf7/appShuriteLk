import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Video } from 'src/app/core/auth/models/video.model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule],
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent implements OnInit {
  videos: Video[] = [];
  userBelt: string = '';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.userBelt = user?.belt ?? 'blanco';

    this.http.get<Video[]>('http://localhost:3000/videos').subscribe((data) => {
      this.videos = data.filter((video) => video.belt.toLowerCase() === this.userBelt.toLowerCase());
    });
  }
}
