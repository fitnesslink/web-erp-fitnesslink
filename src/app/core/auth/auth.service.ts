import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface AppUser {
  id: string;
  firebaseId: string;
  email: string;
  displayName: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  readonly firebaseUser = signal<User | null>(null);
  readonly currentUser = signal<AppUser | null>(null);
  readonly isAuthenticated = computed(() => this.firebaseUser() !== null);
  readonly loading = signal(true);

  constructor() {
    authState(this.auth)
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.firebaseUser.set(user);
        this.loading.set(false);
      });
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    await this.handlePostLogin(credential.user);
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    await this.handlePostLogin(credential.user);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  async getIdToken(): Promise<string | null> {
    const user = this.firebaseUser();
    if (!user) return null;
    return user.getIdToken();
  }

  private async handlePostLogin(user: User): Promise<void> {
    this.firebaseUser.set(user);
    this.router.navigate(['/dashboard']);
  }
}
