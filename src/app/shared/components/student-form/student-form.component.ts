import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnChanges {
  @Input() initialData: any;
  @Input() isEditMode = false;
  @Input() isAdmin = false;
  @Output() formSubmitted = new EventEmitter<any>();
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  form: FormGroup;
    club: string[] = [
    'Club Deportivo Shutite-LK',
    'Colegio Buen Consejo La Laguna',
    'Colegio Luther King La Laguna',
    'Colegio Luther King San Miguel',
    'Colegio Luther King Arafo',
  ];

  belt: string[] = [
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
    'Negro 6ºDAN'
  ];

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.createForm();
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
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
      email: ['', [Validators.required, Validators.email]],
      club: [''],
      informacionAdicional: [''],
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

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

}
