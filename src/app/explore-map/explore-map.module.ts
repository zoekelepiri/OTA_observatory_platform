import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreMapRoutingModule } from './explore-map-routing.module';
import {SharedModule} from "../shared/shared.module";
  import {ExploreMapService} from "./explore-map.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExploreMapRoutingModule,
    SharedModule,
  ],
  providers: [
    ExploreMapService
  ]
})
export class ExploreMapModule { }
