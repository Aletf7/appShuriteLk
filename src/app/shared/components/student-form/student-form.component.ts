import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnChanges {
  @Input() initialData: any;
  @Output() formSubmitted = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      dni: [''],
      pasaporte: [''],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      club: [''],
      identificador: [''],
      informacionAdicional: [''],
      actividad: [''],
      licenciaFederativa: [''],
      fotografia: [''],

      menorEdad: [false],
      tutor: this.fb.group({
        nombre: [''],
        apellidos: [''],
        dni: [''],
        telefono: [''],
        correo: [''],
        direccion: [''],
        poblacion: [''],
        cp: [''],
        provincia: [''],
        informacionAdicional: [''],
        nifAnverso: [''],
        nifReverso: ['']
      }),

      clausula1: [false],
      clausula2: [false],
      clausula3: [false],
      clausula4: [false]
    });
  }

  get tutorGroup(): FormGroup {
    return this.form.get('tutor') as FormGroup;
  }

  submit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }
}
