import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { FarmAsset } from "@app/shared/interfaces";
import { AssetService } from "@app/shared/services";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatButtonModule} from '@angular/material/button';
import { cfImageURL, matIconUrl } from "@app/shared/utils";
import { RouterModule } from "@angular/router";

@Component({
	selector: "fp-view-asset",
	standalone: true,
	imports: [CommonModule,
		RouterModule, 
		MatCardModule, 
		MatChipsModule, 
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatButtonModule
	],
	templateUrl: "./view-asset.component.html",
	styles: ``,
})
export class ViewAssetComponent {
	private assetService = inject(AssetService);

	@Input() id!: number;
	@Input() asset: FarmAsset | undefined;

	today = new Date();

	ngOnInit(): void {
		this.assetService.get(this.id).subscribe((asset) => {
			this.asset = asset;
		});
	}
	matIconUrl = (icon: string) => matIconUrl(icon, "48px");
	cfImageURL = (imageId: string) => cfImageURL(imageId);

	growthRate(asset: FarmAsset) {
		if (!asset.current_price) {
			return 0;
		}

		if (!asset.acquisition_cost) {
			return 0;
		}
		return (
			((asset.current_price - asset.acquisition_cost) /
				asset.acquisition_cost) *
			100
		);
	}

	editNavigate() {
		
	}

}
