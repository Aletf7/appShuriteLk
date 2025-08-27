import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-videos-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule, SafeUrlPipe, HttpClientModule],
  templateUrl: './videos-gallery.component.html',
  styleUrls: ['./videos-gallery.component.scss'],
})
export class VideosGalleryPage {
  videos: any[] = [];
  mostrarInferiores = false;
  userLevel = 'beginner';
  user: any;
  videosVistos: number[] = [];

  levelHierarchy = ['beginner', 'intermediate', 'advanced'];

  beltToLevel: Record<string, string> = {
    blanco: 'beginner',
    amarillo: 'beginner',
    naranja: 'intermediate',
    verde: 'intermediate',
    azul: 'advanced',
    marrón: 'advanced',
    negro: 'advanced',
  };

  constructor(private auth: AuthService, private http: HttpClient) {
    this.user = this.auth.getUser();
    const belt =
      typeof this.user?.belt === 'string'
        ? this.user.belt.toLowerCase()
        : 'blanco';

    this.userLevel = this.beltToLevel[belt] ?? 'beginner';
    this.videosVistos = this.user?.videosVistos ?? [];

    this.fetchVideos();
  }

  fetchVideos(): void {
    this.http.get<any[]>('http://localhost:3000/videos').subscribe((data) => {
      this.videos = data.filter((video) => this.filtrarPorNivel(video.level));
    });
  }

filtrarPorNivel(level: string | undefined): boolean {
  if (!level) return false;

  const userIndex = this.levelHierarchy.indexOf(this.userLevel);
  const videoIndex = this.levelHierarchy.indexOf(level.toLowerCase());

  return this.mostrarInferiores
    ? videoIndex <= userIndex
    : videoIndex === userIndex;
}


  toggleInferiores(): void {
    this.mostrarInferiores = !this.mostrarInferiores;
    this.fetchVideos();
  }

  onVideoPlayed(videoId: number): void {
    if (!this.videosVistos.includes(videoId)) {
      const nuevosVistos = Array.from(new Set([...this.videosVistos, videoId]));

      this.http
        .patch(`http://localhost:3000/users/${this.user.id}`, {
          videosVistos: nuevosVistos,
        })
        .subscribe(() => {
          this.videosVistos = nuevosVistos;
          console.log(`Vídeo ${videoId} marcado como visto`);
        });
    }
  }

  haVisto(videoId: number): boolean {
    return this.videosVistos.includes(videoId);
  }
}
