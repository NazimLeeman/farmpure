import { Component, inject } from "@angular/core";
import { ListFarmsComponent } from "./list-farms/list-farms.component";
import { FarmService } from "@app/shared/services";
import { Router } from "@angular/router";
import { Organization } from "@app/shared/interfaces";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthService } from "ng-oidc";

@Component({
	selector: "fp-farms",
	standalone: true,
	imports: [
		ListFarmsComponent,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
	],
	templateUrl: "./farms.component.html",
	styles: ``,
})
export class FarmsComponent {
	private farmService = inject(FarmService);
	private router = inject(Router);
	private authService = inject(AuthService);

	createNewOrg(): void {
		const organization: Organization = {
			name: `${this.authService.user()?.profile.given_name}'s Farm`,
			creator_id: this.authService.user()?.profile.sub,
		};
		this.farmService.post(organization).subscribe((org) => {
			this.router.navigate([org.uuid, "edit"]);
		});
	}
}
