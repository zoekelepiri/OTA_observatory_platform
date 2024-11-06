import {Component, Input} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {SelectedInfoRegionComponent} from "./selected-info-region/selected-info-region.component";
import {SelectedInfoPrefectureComponent} from "./selected-info-prefecture/selected-info-prefecture.component";
import {PrefectureSimple} from "../../shared/models/prefecture-simple";

@Component({
  selector: 'app-selected-info',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    JsonPipe,
    SelectedInfoRegionComponent,
    SelectedInfoPrefectureComponent
  ],
  templateUrl: './selected-info.component.html',
  styleUrl: './selected-info.component.scss'
})
export class SelectedInfoComponent {
  @Input() selectedRegion?: any;
  @Input() selectedPrefecture?: any;
  @Input() currentPrefectures?: PrefectureSimple[];
}
