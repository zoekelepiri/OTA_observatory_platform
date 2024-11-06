import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-selected-info-prefecture',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './selected-info-prefecture.component.html',
  styleUrl: './selected-info-prefecture.component.scss'
})
export class SelectedInfoPrefectureComponent implements OnInit {
  private _selectedPrefecture?: any;
  @Input() set selectedPrefecture(prefecture: any) {
    this._selectedPrefecture = prefecture;
    this.loadData();
  }

  data: any;

  ngOnInit() {
  }

  loadData() {
    this.data = this._selectedPrefecture.feature.geometry.properties;
    // console.log(this.data);
  }

}
