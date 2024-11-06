import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-region-report-info-card',
  standalone: true,
  imports: [],
  templateUrl: './region-report-info-card.component.html',
  styleUrl: './region-report-info-card.component.scss'
})
export class RegionReportInfoCardComponent {
  @Input() infoLabel!: string;
  @Input() infoValue!: any;
}
