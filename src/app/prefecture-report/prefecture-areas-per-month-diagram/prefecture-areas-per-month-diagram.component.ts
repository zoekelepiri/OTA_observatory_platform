import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {NgIf} from "@angular/common";
import {Prefecture} from "../../shared/models/prefecture";
import {AreaStatsService} from "../../shared/services/area-stats.service";
import {AreaForPrefectureForMonths} from "../../shared/models/stats/area-for-prefecture-for-month";

@Component({
  selector: 'app-prefecture-areas-per-month-diagram',
  standalone: true,
  imports: [
    ChartModule,
    NgIf
  ],
  templateUrl: './prefecture-areas-per-month-diagram.component.html',
  styleUrl: './prefecture-areas-per-month-diagram.component.scss'
})
export class PrefectureAreasPerMonthDiagramComponent implements OnInit{
  @Input() prefecture!: Prefecture;

  loading: boolean = true;

  basicData: any;
  basicOptions: any;
  areasValue: any;

  constructor(
    private areasStatsService: AreaStatsService
  ) {}

  ngOnInit() {
    this.initializeAreasPerMonthDiagram();
  }

  initializeAreasPerMonthDiagram() {
    this.loading = true;
    this.areasStatsService.getAreaForPrefecturePerMonth(this.prefecture.id).subscribe({
      next: (data: AreaForPrefectureForMonths) => {
        this.initializeDiagram(data);
        this.loading = false;
      }
    })
  }

  initializeDiagram(data: AreaForPrefectureForMonths) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: data.areaPerMonth.map(d => d.monthDate),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Μεταβλητότητα Πλήθους Οριζοντίων',
          data: data.areaPerMonth.map(d => d.totalAreas),
          // backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          // borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      type: 'line',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          title: {
            display: true,
            text: 'Πλήθος Οριζοντίων',
            color: textColor
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          title: {
            display: true,
            text: 'Χρονικό Διάστημα',
            color: textColor
          }
        }
      }
    };
  }

}
