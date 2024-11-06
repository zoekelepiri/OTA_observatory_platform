import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {ConfiscationsStatsService} from "../../shared/services/confiscations-stats.service";
import {ConfiscationsPerMonth} from "../../shared/models/stats/confiscations-per-month";

@Component({
  selector: 'app-confiscations-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './confiscations-details.component.html',
  styleUrl: './confiscations-details.component.scss'
})
export class ConfiscationsDetailsComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  monthDate: string = ''; // Property to hold the formatted month date

  constructor(
    private confiscationsStatsService: ConfiscationsStatsService
  ) {}

  ngOnInit() {
    this.initializeConfiscationPerPrefectureDiagram();
  }

  initializeConfiscationPerPrefectureDiagram() {
    this.confiscationsStatsService.getConfiscationsByPrefecturePerMonth().subscribe({
      next: (data: ConfiscationsPerMonth) => {
        this.initializeDiagram(data);
      }
    });
  }

  initializeDiagram(data: ConfiscationsPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Format the monthDate into a human-readable format (optional)
    this.monthDate = new Date(data.monthDate).toLocaleDateString('el-GR', { year: 'numeric', month: 'long' });

    this.basicData = {
      labels: data.confiscationsByPrefecture.map(d => d.prefectureName),
      datasets: [
        {
          label: 'Πλήθος Κατασχέσεων - Νομός',
          data: data.confiscationsByPrefecture.map(d => d.totalConfiscations),
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
            text: 'Πλήθος Κατασχέσεων',
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
