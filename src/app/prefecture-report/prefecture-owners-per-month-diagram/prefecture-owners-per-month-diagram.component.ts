import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {NgIf} from "@angular/common";
import {Prefecture} from "../../shared/models/prefecture";
import {OwnersStatsService} from "../../shared/services/owners-stats.service";
import {OwnersForPrefectureForMonths} from "../../shared/models/stats/owners-for-prefecture-for-month";

@Component({
  selector: 'app-prefecture-owners-per-month-diagram',
  standalone: true,
  imports: [
    ChartModule,
    NgIf
  ],
  templateUrl: './prefecture-owners-per-month-diagram.component.html',
  styleUrl: './prefecture-owners-per-month-diagram.component.scss'
})
export class PrefectureOwnersPerMonthDiagramComponent implements OnInit{
  @Input() prefecture!: Prefecture;

  loading: boolean = true;

  basicData: any;
  basicOptions: any;
  ownersValue: any;

  constructor(
    private ownersStatsService: OwnersStatsService
  ) {}

  ngOnInit() {
    this.initializeOwnersPerMonthDiagram();
  }

  initializeOwnersPerMonthDiagram() {
    this.loading = true;
    this.ownersStatsService.getOwnersForPrefecturePerMonth(this.prefecture.id).subscribe({
      next: (data: OwnersForPrefectureForMonths) => {
        this.initializeDiagram(data);
        this.loading = false;
      }
    })
  }

  initializeDiagram(data: OwnersForPrefectureForMonths) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: data.ownersPerMonth.map(d => d.monthDate),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Μεταβλητότητα Πλήθους Κατασχέσεων',
          data: data.ownersPerMonth.map(d => d.totalOwners),
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
            text: 'Πλήθος Ιδιοκτητών',
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
