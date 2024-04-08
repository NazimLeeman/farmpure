import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { AssetService, FarmService } from "@app/shared/services";
import { cfImageURL, matIconUrl } from "@app/shared/utils";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CommonModule } from "@angular/common";
import { FarmAsset, Organization } from "@app/shared/interfaces";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { AppService } from "@app/core";
import { EditorComponent, ExpandableTableComponent } from "ng-essential";

@Component({
	selector: "fp-list-assets",
	standalone: true,
	// imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatProgressBarModule, MatToolbarModule],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatCardModule,
		MatChipsModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
		RouterModule,
		MatProgressBarModule,
		MatButtonToggleModule,
		MatButtonModule,
		ExpandableTableComponent,
		EditorComponent,
	],
	templateUrl: "./list-assets.component.html",
	styles: ``,
})
export class ListAssetsComponent {
	private appService = inject(AppService);
	private assetService = inject(AssetService);
	private farmService = inject(FarmService);

  viewMode = 'grid_view';
	// table
	columns = ["name", "tags", "age"];
	cellDefs = ["name", "tags", "created_at | timeago"];
	currentExpandedRow?: FarmAsset;
	isShowDetails = false;

	handleRowChange(rowData: FarmAsset | any) {
		this.currentExpandedRow = rowData;
	}

	toggleDetails() {
		this.isShowDetails = !this.isShowDetails;
	}

	today = new Date();
	isHandset = this.appService.isHandset;
	isTablet = this.appService.isTablet;

	assets = this.assetService.items;
	farms = this.farmService.items;

	searchTerm = new FormControl();
	selectedFarm: Organization | undefined;

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

	onFarmChange() {
		// this.selectedFarm = farm;
	}
}
