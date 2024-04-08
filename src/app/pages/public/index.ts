import { Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";

export const PUBLIC_ROUTES: Routes = [
  { path: '', component: IndexComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
];
