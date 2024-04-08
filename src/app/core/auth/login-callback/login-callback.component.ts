import { Component, inject } from "@angular/core";
import { AuthService } from "ng-oidc";

@Component({
	selector: "e-login-callback",
	standalone: true,
	imports: [],
	template: `
    <p>
      login-callback works!
    </p>
  `,
	styles: ``,
})
export class LoginCallbackComponent {
	private authService = inject(AuthService);

	ngOnInit(): void {
		this.authService.handleCallback().then(() => {
			window.location.href = "/";
		});
	}
}
