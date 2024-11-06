import {Component, OnInit} from '@angular/core';
import {PropertiesStatsService} from "../../shared/services/properties-stats.service";
import {PropertiesPerMonth} from "../../shared/models/stats/properties-per-month";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-properties-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './properties-details.component.html',
  styleUrl: './properties-details.component.scss'
})
export class PropertiesDetailsComponent implements OnInit{
  basicData: any;

  basicOptions: any;
  monthDate: string = '';

  constructor(
    private propertiesStatsService: PropertiesStatsService
  ) {}

  ngOnInit() {
    this.initializePropertyPerPrefectureDiagram();
  }

  initializePropertyPerPrefectureDiagram() {
    this.propertiesStatsService.getPropertiesByPrefecturePerMonth().subscribe({
      next: (data: PropertiesPerMonth) => {
        this.initializeDiagram(data);
      }
    })
  }


  initializeDiagram(data: PropertiesPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.monthDate = new Date(data.monthDate).toLocaleDateString('el-GR', { year: 'numeric', month: 'long' });
    this.basicData = {
      labels: data.propertiesByPrefecture.map(d => d.prefectureName),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Πληθός Οριζόντιων Ιδιοκτησιών',
          data: data.propertiesByPrefecture.map(d => d.totalProperties),
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
            text: 'Νομός',
            color: textColor
          }
        }
      }
    };
  }
}
