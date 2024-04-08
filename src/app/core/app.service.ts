import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { toSignal } from "@angular/core/rxjs-interop";
import { Injectable, inject } from "@angular/core";
import { Observable, map, shareReplay } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AppService {
	private breakpointObserver = inject(BreakpointObserver);

	isHandset$ = this.observeBreakpoint(Breakpoints.Handset);
	private isTablet$ = this.observeBreakpoint(Breakpoints.Tablet);

	isHandset = toSignal(this.isHandset$);
	isTablet = toSignal(this.isTablet$);

	private observeBreakpoint(breakpoint: string): Observable<boolean> {
		return this.breakpointObserver.observe(breakpoint).pipe(
			map((result) => result.matches),
			shareReplay(1),
		);
	}

  // config = signal<Config | undefined>(undefined);
}

/**
// should the config needs to be pulled from backend

export interface Config {
	auth: {
		type: string;
		jwt?: JwtAuthConfig;
	};
}

interface JwtAuthConfig {
	isssuer: string;
	clientId: string;
}
*/
