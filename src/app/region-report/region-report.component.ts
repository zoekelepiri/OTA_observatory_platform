import {Component, Input, OnInit} from '@angular/core';
import {RegionService} from "../shared/services/region.service";
import {RegionGeomSimple} from "../shared/models/region-geom-simple";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {RegionGeom} from "../shared/models/region-geom";
import {RegionReportInfoCardComponent} from "./region-report-info-card/region-report-info-card.component";
import {PrefectureSimple} from "../shared/models/prefecture-simple";
import {RegionReport} from "../shared/models/region-report";

@Component({
  selector: 'app-region-report',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RegionReportInfoCardComponent
  ],
  templateUrl: './region-report.component.html',
  styleUrl: './region-report.component.scss'
})
export class RegionReportComponent implements OnInit {
  @Input() id!: number;

  loading: boolean = false;

  region!: RegionReport;

  constructor(
    private regionService: RegionService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeRegionReport();
  }

  private initializeRegionReport() {
    this.loading = true;
    this.regionService.getRegionReport(this.id).subscribe({
      next: (data: RegionReport) => {
        this.region = data;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
        this.router.navigate(['regions']);
      }
    });
  }

  navigateToPrefectureReport(p: PrefectureSimple) {
    this.router.navigate(['prefecture', p.id]);
  }
}
