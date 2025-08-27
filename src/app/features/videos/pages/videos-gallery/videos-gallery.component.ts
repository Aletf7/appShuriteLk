import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-videos-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule, SafeUrlPipe],
  templateUrl: './videos-gallery.component.html',
  styleUrls: ['./videos-gallery.component.scss'],
})
export class VideosGalleryPage {
  videos = [
    {
      title: 'Heian Shodan',
      description: 'Kata básico para principiantes.',
      level: 'beginner',
      videoUrl: '../../../../assets/videos/video1.mp4',
    },
    {
      title: 'Taikyoku Shodan',
      description: 'Kata de iniciación paso a paso.',
      level: 'beginner',
      videoUrl: 'https://www.youtube.com/embed/U4bCOCxYxKQ',
    },
    {
      title: 'Heian Nidan',
      description: 'Kata intermedio con técnicas de defensa.',
      level: 'intermediate',
      videoUrl: 'https://www.youtube.com/embed/IGRR9KhuyIw',
    },
  ];
}
