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
  template: `
    <p-toast />
    <div class="login-page">
      <div class="login-left"></div>
      <div class="login-right">
        <div class="login-content">
          <div class="login-top">
            <img src="logo.svg" alt="FitnessLink" class="login-logo" />
          </div>

          <form (ngSubmit)="onEmailLogin()">
            <input
              type="email"
              class="login-field"
              placeholder="Email Address"
              [(ngModel)]="email"
              name="email"
            />

            <div class="password-wrapper">
              <input
                [type]="showPassword ? 'text' : 'password'"
                class="login-field"
                placeholder="Password"
                [(ngModel)]="password"
                name="password"
              />
              <button type="button" class="password-toggle" (click)="showPassword = !showPassword">
                <i [class]="showPassword ? 'fa-light fa-eye-slash' : 'fa-light fa-eye'"></i>
              </button>
            </div>

            <div class="forgot-link">
              <a href="#">Forgot Password</a>
            </div>

            <button type="submit" class="login-btn" [disabled]="loading()">
              {{ loading() ? 'Signing in...' : 'Login' }}
            </button>

            @if (errorMessage) {
              <p class="login-error">{{ errorMessage }}</p>
            }
          </form>

          <div class="separator">
            <p>Or login with</p>
            <div class="line"></div>
          </div>

          <div class="social-login">
            <div class="social-btn" (click)="onGoogleLogin()">
              <img src="google.png" alt="Google" class="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .login-page {
      width: 100%;
      height: 100vh;
      display: flex;
    }

    .login-left {
      width: 40%;
      height: 100vh;
      background: linear-gradient(135deg, #23AF8D 0%, #197d66 100%);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
      }
    }

    .login-right {
      width: 60%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #F0F4F5;
    }

    .login-content {
      width: 364px;
    }

    .login-top {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: 30px;
    }

    .login-logo {
      width: 153px;
      display: block;
    }

    .login-field {
      width: 100%;
      background-color: #fff;
      margin-bottom: 10px;
      height: 56px;
      border-radius: 100px;
      padding-left: 20px;
      border: none;
      outline: none;
      font-size: 14px;
      color: #222B45;

      &::placeholder {
        color: #7C7B81;
      }

      &:focus {
        box-shadow: 0 0 0 2px rgba(35, 175, 141, 0.2);
      }
    }

    .password-wrapper {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      top: 18px;
      right: 20px;
      background: none;
      border: none;
      cursor: pointer;
      color: #7C7B81;
      font-size: 16px;
      padding: 0;
    }

    .forgot-link {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;

      a {
        color: #23AF8D;
        font-size: 13px;
      }
    }

    .login-btn {
      width: 100%;
      padding: 18px 32px;
      border-radius: 100px;
      background-color: #23AF8D;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      margin-top: 20px;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background-color: #1e967a;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .login-error {
      color: #D62020;
      font-size: 12px;
      margin-top: 10px;
      margin-left: 20px;
    }

    .separator {
      width: 100%;
      height: 15px;
      position: relative;
      margin-top: 40px;

      .line {
        background-color: #23AF8D;
        height: 1px;
        width: 100%;
        position: absolute;
        left: 0;
        top: 5px;
      }

      p {
        width: 120px;
        background-color: #F0F4F5;
        position: absolute;
        top: -3px;
        left: 35%;
        z-index: 1;
        text-align: center;
        color: #23AF8D;
        font-size: 13px;
      }
    }

    .social-login {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
    }

    .social-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      cursor: pointer;
      transition: box-shadow 0.2s;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .social-icon {
      width: 26px;
      height: 26px;
    }
  `,
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
