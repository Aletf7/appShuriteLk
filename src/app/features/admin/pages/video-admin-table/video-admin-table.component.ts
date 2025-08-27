import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-video-admin-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './video-admin-table.component.html',
  styleUrls: ['./video-admin-table.component.scss']
})
export class VideoAdminTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'belt', 'actions'];
  videos: any[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/videos').subscribe(data => {
      this.videos = data;
    });
  }

deleteVideo(id: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: '¿Eliminar vídeo?',
      message: 'Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este vídeo?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.http.delete(`http://localhost:3000/videos/${id}`).subscribe(() => {
        this.videos = this.videos.filter(v => v.id !== id);
        this.snackBar.open('Vídeo eliminado correctamente', 'Cerrar', { duration: 3000 });
      });
    }
  });
}

editVideo(video: any): void {
  this.router.navigate(['/admin/upload'], { state: { video: video } });
}

}
