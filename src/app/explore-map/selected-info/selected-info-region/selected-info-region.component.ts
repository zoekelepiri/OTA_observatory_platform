import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {PrefectureSimple} from "../../../shared/models/prefecture-simple";

@Component({
  selector: 'app-selected-info-region',
  standalone: true,
  imports: [
    DecimalPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './selected-info-region.component.html',
  styleUrl: './selected-info-region.component.scss'
})
export class SelectedInfoRegionComponent implements OnInit {
  private _selectedRegion?: any;
  @Input() set selectedRegion(region: any) {
    this._selectedRegion = region;
    this.loadData();
  }
  @Input() currentPrefectures?: PrefectureSimple[];

  data: any;

  ngOnInit() {
  }

  loadData() {
    this.data = this._selectedRegion.feature.geometry.properties;
    // console.log(this.data);
  }
}
