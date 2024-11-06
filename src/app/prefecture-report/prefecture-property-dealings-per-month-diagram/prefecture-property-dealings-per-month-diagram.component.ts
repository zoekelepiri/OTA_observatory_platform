import {Component, Input, OnInit} from '@angular/core';
import {Prefecture} from "../../shared/models/prefecture";
import {ConfiscationsStatsService} from "../../shared/services/confiscations-stats.service";
import {ConfiscationsForPrefectureForMonths} from "../../shared/models/stats/confiscations-for-prefecture-for-months";
import {PropertyDealingStatsService} from "../../shared/services/property-dealing-stats.service";
import {PropertyDealingForPrefectureForMonths} from "../../shared/models/stats/property-dealing-prefecture-per-month";
import {ChartModule} from "primeng/chart";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-prefecture-property-dealings-per-month-diagram',
  standalone: true,
  imports: [
    ChartModule,
    NgIf
  ],
  templateUrl: './prefecture-property-dealings-per-month-diagram.component.html',
  styleUrl: './prefecture-property-dealings-per-month-diagram.component.scss'
})
export class PrefecturePropertyDealingsPerMonthDiagramComponent implements OnInit{
  @Input() prefecture!: Prefecture;

  loading: boolean = true;

  basicData: any;
  basicOptions: any;
  propertyDealingsValue: any;

  constructor(
    private propertyDealingsStatsService: PropertyDealingStatsService
  ) {}

  ngOnInit() {
    this.initializePropertyDealingPerMonthDiagram();
  }

  initializePropertyDealingPerMonthDiagram() {
    this.loading = true;
    this.propertyDealingsStatsService.getPropertyDealingForPrefecturePerMonth(this.prefecture.id).subscribe({
      next: (data: PropertyDealingForPrefectureForMonths) => {
        this.initializeDiagram(data);
        this.loading = false;
      }
    })
  }

  initializeDiagram(data: PropertyDealingForPrefectureForMonths) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: data.propertyDealingPerMonth.map(d => d.monthDate),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Μεταβλητότητα Πλήθους Αγοροπωλησιών',
          data: data.propertyDealingPerMonth.map(d => d.totalPropertyDealings),
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
            text: 'Πλήθος Αγοροπωλησιών',
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
