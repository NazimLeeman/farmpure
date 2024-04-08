import { Routes } from "@angular/router";
import { FarmsComponent } from "./farms.component";

export const FARM_ROUTES: Routes = [
	{
		path: "",
		children: [
			{
				path: "",
				component: FarmsComponent,
			},
			{
				path: ":id/edit",
				loadComponent: () =>
					import("./edit-farm/edit-farm.component").then(
						(m) => m.EditFarmComponent,
					),
			},
			{
				path: ":id",
				loadComponent: () =>
					import("./view-farm/view-farm.component").then(
						(m) => m.ViewFarmComponent,
					),
			},
		],
	},
];
