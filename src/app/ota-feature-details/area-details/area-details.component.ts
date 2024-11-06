import { Component, OnInit } from '@angular/core';
import {ChartModule} from "primeng/chart";
import {AreaStatsService} from "../../shared/services/area-stats.service";
import {AreaPerMonth} from "../../shared/models/stats/area-per-month";

@Component({
  selector: 'app-area-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './area-details.component.html',
  styleUrl: './area-details.component.scss'
})
export class AreaDetailsComponent {
  basicData: any;

  basicOptions: any;
  monthDate: string = '';

  constructor(
    private areaStatsService: AreaStatsService
  ) {}

  ngOnInit() {
    this.initializeAreaPerPrefectureDiagram();
  }

  initializeAreaPerPrefectureDiagram() {
    this.areaStatsService.getAreaByPrefecturePerMonth().subscribe({
      next: (data: AreaPerMonth) => {
        this.initializeDiagram(data);
      }
    })
  }


  initializeDiagram(data: AreaPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.monthDate = new Date(data.monthDate).toLocaleDateString('el-GR', { year: 'numeric', month: 'long' });
    this.basicData = {
      labels: data.areaByPrefecture.map(d => d.prefectureName),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Εμβαδό Οριζοντίων - Νομός',
          data: data.areaByPrefecture.map(d => d.totalAreas),
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
            text: 'Πλήθος Εμβαδόν Οριζοντίων',
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
