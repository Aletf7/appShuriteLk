import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AuthService } from 'src/app/core/auth/services/auth.service';

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
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnChanges {
  @Input() initialData: any;
  @Input() isEditMode = false;
  @Input() isAdmin = false;
  @Output() formSubmitted = new EventEmitter<any>();

  form: FormGroup;

  belt: string[] = [
    'Blanco',
    'Amarillo',
    'Naranja',
    'Verde',
    'Azul',
    'Marrón',
    'Negro',
  ];

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.createForm();
  }
  ngOnInit() {
    this.isAdmin = this.auth.getRole() === 'admin'; // Asegúrate de tener AuthService inyectado
    if (this.initialData) {
      this.form.patchValue({
        ...this.initialData,
        belt: this.initialData.belt ?? '',
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue({
        ...this.initialData,
        belt: this.initialData.belt ?? '',
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
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
      belt: [''],
      isTrusted: [false],
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
        nifReverso: [''],
      }),

      clausula1: [false],
      clausula2: [false],
      clausula3: [false],
      clausula4: [false],
    });
  }

  get tutorGroup(): FormGroup {
    return this.form.get('tutor') as FormGroup;
  }

  onFileChange(event: Event, controlName: string, group?: FormGroup): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const targetGroup = group ?? this.form;
      targetGroup.patchValue({ [controlName]: file });
      targetGroup.get(controlName)?.updateValueAndValidity();
    }
  }

submit(): void {
  if (this.form.valid) {
    const formData = { ...this.form.value };

    // 🧮 Calcular edad
    const born = new Date(formData.fechaNacimiento);
    const hoy = new Date();
    let age = hoy.getFullYear() - born.getFullYear();
    const m = hoy.getMonth() - born.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < born.getDate())) {
      age--;
    }

    formData.age = age; // ✅ Añadir al objeto

    console.log('Datos emitidos con edad:', formData);
    this.formSubmitted.emit(formData);
  }
}

}
