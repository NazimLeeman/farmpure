import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { Organization } from "@app/shared/interfaces";
import { FarmService } from "@app/shared/services";

@Component({
	selector: "fp-edit-farm",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./edit-farm.component.html",
	styles: ``,
})
export class EditFarmComponent {
	private farmService = inject(FarmService);

	@Input() id!: number;
	@Input() farm: Organization | undefined;

	ngOnInit(): void {
		this.farmService.get(this.id).subscribe((org) => {
			this.farm = org;
		});
	}
}
