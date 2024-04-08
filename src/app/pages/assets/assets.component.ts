import { Component } from "@angular/core";
import { ListAssetsComponent } from "./list-assets/list-assets.component";

@Component({
	selector: "fp-assets",
	standalone: true,
	imports: [ListAssetsComponent],
	templateUrl: "./assets.component.html",
	styles: ``,
})
export class AssetsComponent {}
