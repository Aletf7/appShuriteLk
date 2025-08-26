import { Component, OnInit, computed, effect } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isMobile = false;

  role = computed(() => this.authService.getRole() ?? null);
  userName = computed(() => this.authService.getUserName() ?? null);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    effect(() => {
      console.log('Sidebar role:', this.role());
      console.log('Sidebar userName:', this.userName());
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
