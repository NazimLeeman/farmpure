import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { EditorComponent } from "ng-essential";
import { AuthService } from "ng-oidc";

@Component({
	selector: "fp-account",
	standalone: true,
	imports: [CommonModule, EditorComponent],
	templateUrl: "./account.component.html",
	styles: ``,
})
export class AccountComponent {
	private auth = inject(AuthService);

	login() {
		this.auth.login();
	}

	logout() {
		this.auth.logout();
	}

	user = this.auth.user;

	getUser() {
		this.auth.getUser().subscribe((user) => {
			console.log(user);
		});
	}
}
