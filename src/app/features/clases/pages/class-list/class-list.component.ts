import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Video } from 'src/app/core/auth/models/video.model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-class-list',
  imports: [CommonModule, HttpClientModule, MatCardModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss',
})
export class ClassListComponent implements OnInit {
  videos: any[] = [];
  userBelt: string = '';
  beltHierarchy = [
    'blanco',
    'amarillo',
    'naranja',
    'verde',
    'azul',
    'marrón',
    'negro',
  ];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.userBelt = user?.belt ?? 'blanco';

    this.http.get<Video[]>('assets/videos.json').subscribe((data) => {
      this.videos = data.filter((video) => this.puedeVer(video.belt));
    });
  }

  puedeVer(belt: string): boolean {
    const userIndex = this.beltHierarchy.indexOf(this.userBelt.toLowerCase());
    const videoIndex = this.beltHierarchy.indexOf(belt.toLowerCase());
    return videoIndex <= userIndex;
  }
}
