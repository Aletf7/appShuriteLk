import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-student-profile-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, SafeUrlPipe],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  studentId = this.route.snapshot.params['id'];
  student: any = null;
  recommendedVideos: any[] = [];

  ngOnInit() {
    this.http.get(`/students/${this.studentId}`).subscribe((data: any) => {
      this.student = data;
      this.loadRecommendedVideos(data.belt);
    });
  }

  loadRecommendedVideos(belt: string) {
    const allVideos = [
      { title: 'Heian Shodan', level: 'Green', videoUrl: 'https://www.youtube.com/embed/SiIu4VRwf6I' },
      { title: 'Heian Nidan', level: 'Blue', videoUrl: 'https://www.youtube.com/embed/IGRR9KhuyIw' }
    ];
    this.recommendedVideos = allVideos.filter(v => v.level === belt);
  }
}
