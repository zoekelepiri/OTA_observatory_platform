import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {GreeceAreaService} from "../shared/services/greece-area.service";
import {GreeceArea} from "../shared/models/greece-area";
import {AreaItemComponent} from "./area-item/area-item.component";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {RegionGeom} from "../shared/models/region-geom";

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [
    NgForOf,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    AreaItemComponent
  ],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  loading: boolean = false;
  areas: GreeceArea[] = [];
  filteredAreas: GreeceArea[] = [];

  constructor(
    private greeceAreaService: GreeceAreaService,
  ) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  initializeSearch() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: (query: string) => this.filterAreas(query)
    });
  }

  private loadRegions() {
    this.loading = true;
    this.greeceAreaService.getGreeceAreas().subscribe({
      next: (data: GreeceArea[]) => {
        this.areas = data;
        this.filteredAreas = [...this.areas];
        this.initializeSearch();
        this.loading = false;
      },
      error: error => {
        this.loading = false;
      }
    })
  }

  onFilter(value: string) {
    console.log(value);
    this.searchSubject.next(value);
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  private filterAreas(query: string) {
    this.filteredAreas = this.areas.filter(area => area.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
}
