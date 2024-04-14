import { Routes } from "@angular/router";
import { AssetsComponent } from "./assets.component";

export const ASSET_ROUTES: Routes = [
	{
		path: "",
		children: [
			{
				path: "",
				component: AssetsComponent,
			},
			{
				path: ":id/edit",
				loadComponent: () =>
					import("./edit-asset/edit-asset.component").then(
						(m) => m.EditAssetComponent,
					),
			},
			{
				path: ":id",
				loadComponent: () =>
					import("./view-asset/view-asset.component").then(
						(m) => m.ViewAssetComponent,
					),
			},
		],
	},
];

// loadChildren() {
//   return import("./index.component").then((module) => module.IndexComponent);
// },
// loadComponent() {
//   return import("./index.component").then((module) => module.IndexComponent);
// },

/**
https://angular.io/guide/devtools
https://www.youtube.com/watch?v=FjyX_hkscII
 */
