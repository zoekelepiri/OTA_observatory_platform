import {Component, Input, OnInit} from '@angular/core';
import {Prefecture} from "../../shared/models/prefecture";
import {ChartModule} from "primeng/chart";
import {ConfiscationsStatsService} from "../../shared/services/confiscations-stats.service";
import {ConfiscationsPerMonth} from "../../shared/models/stats/confiscations-per-month";
import {ConfiscationsForPrefectureForMonths} from "../../shared/models/stats/confiscations-for-prefecture-for-months";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-prefecture-confiscations-per-month-diagram',
  standalone: true,
  imports: [
    ChartModule,
    NgIf
  ],
  templateUrl: './prefecture-confiscations-per-month-diagram.component.html',
  styleUrl: './prefecture-confiscations-per-month-diagram.component.scss'
})
export class PrefectureConfiscationsPerMonthDiagramComponent implements OnInit {
  @Input() prefecture!: Prefecture;

  loading: boolean = true;

  basicData: any;
  basicOptions: any;
  confiscationsValue: any;

  constructor(
    private confiscationsStatsService: ConfiscationsStatsService
  ) {}

  ngOnInit() {
    this.initializeConfiscationsPerMonthDiagram();
  }

  initializeConfiscationsPerMonthDiagram() {
    this.loading = true;
    this.confiscationsStatsService.getConfiscationsForPrefecturePerMonth(this.prefecture.id).subscribe({
      next: (data: ConfiscationsForPrefectureForMonths) => {
        this.initializeDiagram(data);
        this.loading = false;
      }
    })
  }


  initializeDiagram(data: ConfiscationsForPrefectureForMonths) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: data.confiscationsPerMonth.map(d => d.monthDate),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Μεταβλητότητα Πλήθους Κατασχέσεων',
          data: data.confiscationsPerMonth.map(d => d.totalConfiscations),
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
            text: 'Πλήθος Καταασχέσεων',
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
