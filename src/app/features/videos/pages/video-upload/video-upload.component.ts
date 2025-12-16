import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss'],
})
export class VideoUploadPage {
  uploadForm: FormGroup;
  uploadedVideos: any[] = [];
  editMode = false;
  videoId: number | null = null;

  beltOptions = [
    'Blanco',
    'Blanco-Amarillo',
    'Amarillo',
    'Amarillo-Naranja',
    'Naranja',
    'Naranja-Verde',
    'Verde',
    'Verde-Azul',
    'Azul',
    'Azul-Marrón',
    'Marrón',
    'Negro',
    'Negro 1ºDAN',
    'Negro 2ºDAN',
    'Negro 3ºDAN',
    'Negro 4ºDAN',
    'Negro 5ºDAN',
    'Negro 6ºDAN',
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      belt: ['', Validators.required],
      file: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const video = navigation?.extras.state?.['video'];

    if (video) {
      this.uploadForm.patchValue(video);
      this.editMode = true;
      this.videoId = video.id;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ file });
    }
  }

  submit(): void {
    if (this.uploadForm.valid) {
      const video = {
        title: this.uploadForm.value.title,
        description: this.uploadForm.value.description,
        belt: this.uploadForm.value.belt,
        url: 'assets/videos/' + this.uploadForm.value.file.name, // simulación
      };

      this.http.post('http://localhost:3000/videos', video).subscribe(() => {
        this.uploadedVideos.push(video);
        this.uploadForm.reset();
      });
      this.snackBar.open(
        this.editMode
          ? 'Vídeo actualizado correctamente'
          : 'Vídeo subido correctamente',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
