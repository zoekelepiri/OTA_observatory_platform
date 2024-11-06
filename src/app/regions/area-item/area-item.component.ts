import {Component, Input, OnInit} from '@angular/core';
import {GreeceArea} from "../../shared/models/greece-area";
import {NgClass, NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-area-item',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './area-item.component.html',
  styleUrl: './area-item.component.scss'
})
export class AreaItemComponent implements OnInit {
  @Input() area!: GreeceArea;
  areaTypeName: string = '';
  borderClasses: string[] = [];
  markerClasses: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    if (this.area.type === 'REGION') {
      this.areaTypeName = 'Περιφέρεια';
      this.borderClasses.push('border-blue-600');
      this.markerClasses.push('text-blue-600');
    } else if (this.area.type === 'PREFECTURE') {
      this.areaTypeName = 'Νομός';
      this.borderClasses.push('border-green-600');
      this.markerClasses.push('text-green-600');
    }
  }

  navigateToAreaDetails() {
    if (this.area.type === 'REGION') {
      this.router.navigate([this.area.regionId], { relativeTo: this.activatedRoute });
    } else if (this.area.type === 'PREFECTURE') {
      this.router.navigate(['prefecture', this.area.prefectureId]);
    }

  }
}
