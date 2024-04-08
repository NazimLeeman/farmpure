import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, UserManagerSettings, User } from 'oidc-client-ts';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OIDC_CONFIG_TOKEN } from './oidc-config.token';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  private userSubject = new BehaviorSubject<User | null>(null);
  private authErrorSubject = new BehaviorSubject<Error | null>(null);

  public user$: Observable<User | null> = this.userSubject.asObservable();
  public isAuthenticated$: Observable<boolean> = this.user$.pipe(map(user => !!user && !user.expired));
  public authErrors$: Observable<Error | null> = this.authErrorSubject.asObservable();
  public user = toSignal(this.user$);

  constructor(
    @Inject(OIDC_CONFIG_TOKEN) private config: UserManagerSettings,
    private router: Router
  ) {
    this.userManager = new UserManager(config);
    this.initUser();
  }

  private initUser(): void {
    from(this.userManager.getUser()).pipe(
      catchError(error => {
        this.authErrorSubject.next(error);
        return of(null);
      }),
      tap(user => this.userSubject.next(user))
    ).subscribe();
  }

  async login(): Promise<void> {
    try {
      await this.userManager.signinRedirect();
    } catch (error) {
      this.authErrorSubject.next(error as Error);
    }
  }

  async handleCallback(): Promise<void> {
    try {
      const user = await this.userManager.signinRedirectCallback();
      this.userSubject.next(user);
      await this.router.navigate(['/']); // Navigate to the home page or a post-login page
    } catch (error) {
      this.authErrorSubject.next(error as Error);
      await this.router.navigate(['/login']); // Redirect to login on error
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userManager.signoutRedirect();
    } catch (error) {
      this.authErrorSubject.next(error as Error);
    }
  }

  // Utility method for components to reactively get the current user
  getUser(): Observable<User | null> {
    return this.user$;
  }

  // Expose the UserManager instance for advanced use cases
  get userManagerInstance(): UserManager {
    return this.userManager;
  }
}
