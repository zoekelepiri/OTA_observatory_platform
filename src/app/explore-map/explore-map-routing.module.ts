import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExploreMapComponent} from "./explore-map.component";

const routes: Routes = [
  { path: '', pathMatch: "full", component: ExploreMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreMapRoutingModule { }
