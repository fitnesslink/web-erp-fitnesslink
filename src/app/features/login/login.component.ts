import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';

import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private notifications = inject(NotificationService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);
  showPassword = false;
  errorMessage = '';

  async onEmailLogin() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password is required';
      return;
    }

    this.loading.set(true);
    try {
      await this.authService.loginWithEmail(this.email, this.password);
    } catch (error: unknown) {
      this.errorMessage =
        error instanceof Error ? error.message : 'Invalid email or password';
    } finally {
      this.loading.set(false);
    }
  }

  async onGoogleLogin() {
    this.loading.set(true);
    try {
      await this.authService.loginWithGoogle();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Google login failed';
      this.notifications.error(message);
    } finally {
      this.loading.set(false);
    }
  }
}
