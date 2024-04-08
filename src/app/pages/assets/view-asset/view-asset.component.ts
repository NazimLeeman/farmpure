import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { FarmAsset } from "@app/shared/interfaces";
import { AssetService } from "@app/shared/services";

@Component({
	selector: "fp-view-asset",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./view-asset.component.html",
	styles: ``,
})
export class ViewAssetComponent {
	private assetService = inject(AssetService);

	@Input() id!: number;
	@Input() asset: FarmAsset | undefined;

	ngOnInit(): void {
		this.assetService.get(this.id).subscribe((asset) => {
			this.asset = asset;
		});
	}
}
