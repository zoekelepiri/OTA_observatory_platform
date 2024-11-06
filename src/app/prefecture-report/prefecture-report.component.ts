import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf, Location, DecimalPipe} from "@angular/common";
import {
  RegionReportInfoCardComponent
} from "../region-report/region-report-info-card/region-report-info-card.component";
import {PrefectureService} from "../shared/services/prefecture.service";
import {Prefecture} from "../shared/models/prefecture";
import {Router} from "@angular/router";
import {
  PrefectureConfiscationsPerMonthDiagramComponent
} from "./prefecture-confiscations-per-month-diagram/prefecture-confiscations-per-month-diagram.component";
import {
  PrefectureMortgagePerMonthDiagramComponent
} from "./prefecture-mortgage-per-month-diagram/prefecture-mortgage-per-month-diagram.component";
import {
  PrefectureAreasPerMonthDiagramComponent
} from "./prefecture-areas-per-month-diagram/prefecture-areas-per-month-diagram.component";
import {
  PrefectureOwnersPerMonthDiagramComponent
} from "./prefecture-owners-per-month-diagram/prefecture-owners-per-month-diagram.component";
import {
  PrefecturePropertiesPerMonthDiagramComponent
} from "./prefecture-properties-per-month-diagram/prefecture-properties-per-month-diagram.component";
import {
  PrefecturePropertyDealingsPerMonthDiagramComponent
} from "./prefecture-property-dealings-per-month-diagram/prefecture-property-dealings-per-month-diagram.component";

@Component({
  selector: 'app-prefecture-report',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RegionReportInfoCardComponent,
    PrefectureConfiscationsPerMonthDiagramComponent,
    PrefectureMortgagePerMonthDiagramComponent,
    PrefectureAreasPerMonthDiagramComponent,
    PrefectureOwnersPerMonthDiagramComponent,
    PrefecturePropertiesPerMonthDiagramComponent,
    PrefecturePropertyDealingsPerMonthDiagramComponent,
    DecimalPipe
  ],
  templateUrl: './prefecture-report.component.html',
  styleUrl: './prefecture-report.component.scss'
})
export class PrefectureReportComponent implements OnInit {
  @Input() id!: number;

  loading: boolean = false;

  prefecture!: Prefecture;

  constructor(
    private prefectureService: PrefectureService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.initializePrefectureData();
  }

  initializePrefectureData() {
    this.loading = true;
    this.prefectureService.getPrefectureDetails(this.id).subscribe({
      next: (value: Prefecture) => {
        this.prefecture = value;
        console.log(value);
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.location.back();
      }
    });
  }

}
