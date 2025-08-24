import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadPage {
  videoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      level: ['', Validators.required],
      videoUrl: ['', Validators.required]
    });
  }

  submit(): void {
    console.log('Video data:', this.videoForm.value);
    // Aquí luego conectaremos con el backend o servicio de subida
  }
}
