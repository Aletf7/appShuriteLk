import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
    MatSelect,
    MatOption,
    FormsModule,
  ],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'surname',
    'club',
    'age',
    'belt',
    'visto',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>([]);
  isAdmin = false;
  centros: string[] = [
    'Club Deportivo Shutite-LK',
    'Colegio Buen Consejo La Laguna',
    'Colegio Luther King La Laguna',
    'Colegio Luther King San Miguel',
    'Colegio Luther King Arafo',
  ];
  nombreFiltro: string = '';
  centroSeleccionado: string = '';
  videoId: number = 5; // Puedes cambiarlo dinámicamente si lo necesitas

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.getRole() === 'admin';

    if (this.isAdmin) {
      this.http.get<any[]>('http://localhost:3000/users').subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        // Filtro combinado: nombre + centro
        this.dataSource.filterPredicate = (student, filter) => {
          const { nombre, centro } = JSON.parse(filter);
          const nombreMatch = student.name.toLowerCase().includes(nombre);
          const centroMatch = centro
            ? student.centro?.toLowerCase().includes(centro)
            : true;
          return nombreMatch && centroMatch;
        };
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editStudent(id: number): void {
    this.router.navigate([`/students/${id}/edit`]);
  }

  hasSeenVideo(student: any): boolean {
    return student.videosVistos?.includes(this.videoId);
  }

  centerFilter(): void {
    const centro = this.centroSeleccionado.toLowerCase();
    this.dataSource.filterPredicate = (student, filter) =>
      student.centro?.toLowerCase().includes(filter);
    this.dataSource.filter = centro;
  }

  applyCombinedFilter(): void {
    const filtro = {
      nombre: this.nombreFiltro.trim().toLowerCase(),
      centro: this.centroSeleccionado.trim().toLowerCase(),
    };
    this.dataSource.filter = JSON.stringify(filtro);
  }

  limpiarFiltros(): void {
    this.nombreFiltro = '';
    this.centroSeleccionado = '';
    this.applyCombinedFilter();

    this.snackBar.open('Filtros reiniciados', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Eliminar usuario?',
        message: '¿Seguro que quieres eliminar este usuario del sistema?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    });
  }
}
