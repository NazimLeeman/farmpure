import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { FarmService } from "@app/shared/services";
import { matIconUrl } from "@app/shared/utils";

@Component({
	selector: "fp-list-farms",
	standalone: true,
	imports: [MatCardModule, MatButtonModule, RouterModule],
	templateUrl: "./list-farms.component.html",
	styles: ``,
})
export class ListFarmsComponent {
	private farmService = inject(FarmService);

	organizations = this.farmService.items;

	matIconUrl = (icon: string) => matIconUrl(icon, "48px");
}
