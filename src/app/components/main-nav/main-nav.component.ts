import {Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '@/services/auth/auth.service';

@Component({
  selector: 'app-main-nav',
  imports: [
    RouterLink
  ],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  private authService = inject(AuthService);
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  logout(): void {
    this.authService.logout();
  }
}
