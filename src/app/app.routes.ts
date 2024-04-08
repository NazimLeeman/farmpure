import { Routes } from '@angular/router';
import { LoginCallbackComponent } from '@app/core/auth';

export const routes: Routes = [
	{
		path: "assets",
		loadChildren: () => import("./pages/assets").then((m) => m.ASSET_ROUTES),
	},
	{
		path: "farms",
		loadChildren: () => import("./pages/farms").then((m) => m.FARM_ROUTES),
	},
  // account
  { path: "signin/callback", component: LoginCallbackComponent },
  {
		path: "account",
		loadChildren: () => import("./pages/account").then((r) => r.ACCOUNT_ROUTES),
	},
  // index / home
	{
		path: "",
		loadChildren: () => import('./pages/public').then((r) => r.PUBLIC_ROUTES),
	},
];
