import { Component } from '@angular/core';
import {PropertyDealingStatsService} from "../../shared/services/property-dealing-stats.service";
import {PropertyDealingPerMonth} from "../../shared/models/stats/property-dealing-per-month";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-property-dealing-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './property-dealing-details.component.html',
  styleUrl: './property-dealing-details.component.scss'
})
export class PropertyDealingDetailsComponent {
  basicData: any;

  basicOptions: any;
  monthDate: string = '';

  constructor(
    private propertyDealingStatsService: PropertyDealingStatsService
  ) {}

  ngOnInit() {
    this.initializePropertyDealingPerPrefectureDiagram();
  }

  initializePropertyDealingPerPrefectureDiagram() {
    this.propertyDealingStatsService.getPropertyDealingByPrefecturePerMonth().subscribe({
      next: (data: PropertyDealingPerMonth) => {
        this.initializeDiagram(data);
      }
    })
  }


  initializeDiagram(data: PropertyDealingPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.monthDate = new Date(data.monthDate).toLocaleDateString('el-GR', { year: 'numeric', month: 'long' });

    this.basicData = {
      labels: data.propertyDealingByPrefecture.map(d => d.prefectureName),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Πλήθος Αγοροπωλησιών - Νομός',
          data: data.propertyDealingByPrefecture.map(d => d.totalPropertyDealing),
          // backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          // borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
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
            text: 'Πληθός Αγοροπωλησιών',
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
            text: 'Νομός',
            color: textColor
          }
        }
      }
    };
  }
}
