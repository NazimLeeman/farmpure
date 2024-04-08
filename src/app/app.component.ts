import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from 'ng-oidc';
import { filter, Subscription } from 'rxjs';
import { AppService } from '@app/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Entity } from '@shared/interfaces';

@Component({
  selector: 'fp-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private app = inject(AppService);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private title = inject(Title);
  private router = inject(Router);
  private routeSubscription: Subscription = new Subscription();

  isHandset = this.app.isHandset;
  user = this.authService.user;
  error: Error | null = null;
  @ViewChild("drawer") drawer!: MatSidenav;

  ngOnInit() {
    this.routeSubscription = this.app.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.routeSubscription.add(
          this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
              this.drawer.close();
            }),
        );
      }
    });

    // this.title.setTitle('FarmPure: the marketplace for agro futures - buy now, get at harvest');
  }

	login() {
		this.authService.login();
	}

	logout() {
		this.authService.logout();
	}

  user$ = this.authService.user$;

  featureRoutes: Entity[] = [
    {
      name: "Farms",
      url: "/farms",
      icon: "agriculture",
    },
    {
      name: "Assets",
      url: "/assets",
      icon: "pets",
    },
    // {
    //   name: "Projects",
    //   url: "/projects",
    //   icon: "savings",
    // },
    // {
    //   name: "Farm Manager",
    //   url: "/erp",
    //   icon: "apps",
    // },
  ]
}
