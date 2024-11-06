import {Component, Input, OnInit} from '@angular/core';
import {Prefecture} from "../../shared/models/prefecture";
import {PropertiesStatsService} from "../../shared/services/properties-stats.service";
import {PropertiesForPrefectureForMonths} from "../../shared/models/stats/properties-for-prefecture-for-month";
import {ChartModule} from "primeng/chart";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-prefecture-properties-per-month-diagram',
  standalone: true,
  imports: [
    ChartModule,
    NgIf
  ],
  templateUrl: './prefecture-properties-per-month-diagram.component.html',
  styleUrl: './prefecture-properties-per-month-diagram.component.scss'
})
export class PrefecturePropertiesPerMonthDiagramComponent implements OnInit{
  @Input() prefecture!: Prefecture;

  loading: boolean = true;

  basicData: any;
  basicOptions: any;
  propertiesValue: any;

  constructor(
    private propertiesStatsService: PropertiesStatsService
  ) {}

  ngOnInit() {
    this.initializePropertiesPerMonthDiagram();
  }

  initializePropertiesPerMonthDiagram() {
    this.loading = true;
    this.propertiesStatsService.getPropertiesForPrefecturePerMonth(this.prefecture.id).subscribe({
      next: (data: PropertiesForPrefectureForMonths) => {
        this.initializeDiagram(data);
        this.loading = false;
      }
    })
  }

  initializeDiagram(data: PropertiesForPrefectureForMonths) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: data.propertiesPerMonth.map(d => d.monthDate),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Μεταβλητότητα Πλήθους Κατασχέσεων',
          data: data.propertiesPerMonth.map(d => d.totalProperties),
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
            text: 'Πλήθος Οριζόντιων Ιδιοκτησιών',
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
