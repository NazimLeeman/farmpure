import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { Organization } from "@app/shared/interfaces";
import { FarmService } from "@app/shared/services";

@Component({
	selector: "fp-view-farm",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./view-farm.component.html",
	styles: ``,
})
export class ViewFarmComponent implements OnInit {
	private farmService = inject(FarmService);

	@Input() id!: number;
	@Input() farm: Organization | undefined;

	ngOnInit(): void {
		this.farmService.get(this.id).subscribe((org) => {
			this.farm = org;
		});
	}
}
