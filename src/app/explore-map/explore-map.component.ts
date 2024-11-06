import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import {ExploreMapService} from "./explore-map.service";
import {geoJson, LatLng, Layer, LeafletEvent, LeafletMouseEvent} from "leaflet";
import {SelectedInfoComponent} from "./selected-info/selected-info.component";
import {PrefectureGeomSimple} from "../shared/models/prefecture-geom-simple";
import {Feature, GeoJsonObject, Point} from "geojson";
import {RegionGeomSimple} from "../shared/models/region-geom-simple";
import {PrefectureSimple} from "../shared/models/prefecture-simple";

@Component({
  selector: 'app-explore-map',
  standalone: true,
  imports: [
    SelectedInfoComponent
  ],
  templateUrl: './explore-map.component.html',
  styleUrl: './explore-map.component.scss'
})
export class ExploreMapComponent implements AfterViewInit {
  private map: L.Map | undefined;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  regions: L.FeatureGroup = L.featureGroup();
  currentPrefectures: PrefectureSimple[] = [];

  regionsGeoJson: L.GeoJSON | undefined;
  prefectureGeoJson: L.GeoJSON | undefined;
  capitalsGeoJson: L.GeoJSON | undefined;

  selectedPrefecture: any;
  selectedRegion: any

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [ 38.55, 24.00],
      zoom: 7,
      zoomControl: false,
      doubleClickZoom: false,
      closePopupOnClick: false,
      dragging: false,
      // zoomSnap: false,
      // zoomDelta: false,
      trackResize: false,
      touchZoom: false,
      scrollWheelZoom: false
    });

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map);

    const positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      // maxZoom: 7,
      minZoom: 7,
    }).addTo(this.map);

    const backLink = L.Control.extend({
      onAdd: (map: any) => {
        const back = L.DomUtil.create('div', 'back');
        back.innerHTML = '< Πίσω';
        back.className = 'font-bold cursor-pointer text-blue-600 hover:text-blue-800 hover:underline active:text-blue-900 text-3xl';
        back.addEventListener('click', () => {
          map.fitBounds(this.regionsGeoJson?.getBounds());
          if (this.regionsGeoJson && this.map) {
            this.regionsGeoJson?.addTo(this.map);
            this.prefectureGeoJson?.clearLayers();
            this.capitalsGeoJson?.clearLayers();
            this.regionsGeoJson?.resetStyle();
            this.selectedPrefecture = undefined;
            this.selectedRegion = undefined;
          }
        });
        return back;
      },
      onRemove: (map: any) => {
        // L.DomEvent.off()
      }
    });

    new backLink({position: "topleft"}).addTo(this.map);

  }

  constructor(
    private exploreMapService: ExploreMapService,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();

    // get the regions initially to show the first map
    this.exploreMapService.getRegions().subscribe({
      next: (data: RegionGeomSimple[]) => {

        if (this.map) {

          this.regions = L.featureGroup();
          // regions.addTo(this.map);

          const geoJsonsList: geojson.GeoJsonObject[] = [];
          data.forEach((item: any) => {
            const region: geojson.Feature = item.geom;
            region.properties = {
              ...item
            };
            geoJsonsList.push(region);
          });

          this.regionsGeoJson = L.geoJson(geoJsonsList, {
            // onEachFeature: this.onEachFeature({
            //   mouseover: this.highlightFeature,
            //   mouseout: () => {
            //     this.regionsGeoJson?.resetStyle()
            //   },
            //   click: this.zoomToFeature(this.map)
            // })
          });

          this.regionsGeoJson.addTo(this.map);

          // add event listeners for each layer (region). Similar to the commented part above
          for (const regionItem of this.regionsGeoJson.getLayers()) {
            regionItem.addEventListener({
              mouseover: this.highlightFeature,
              mouseout: (e: LeafletMouseEvent) => {
                this.regionsGeoJson?.resetStyle(e.target)
              },
              click: this.zoomToFeature(this.map)
            })
          }

        }
      }
    });

  }

  highlightFeature(feature: any): void {
    const layer = feature.target;

    layer.setStyle({
      weight: 5,
      color: '#555',
      dashArray: '',
      fillOpacity: 0.7,
    });

    layer.bringToFront();
  }

  resetHighlight(geoJsons: L.GeoJSON) {

    return () => {
      geoJsons.resetStyle();
    }
  }

  zoomToFeature(map: L.Map) {
    return (e: LeafletMouseEvent) => {
      this.selectedRegion = e.target;
      map.fitBounds(e.target.getBounds());
      console.log(e.target.feature.geometry.properties.name);
      console.log(e.target.feature.geometry.properties);
      if (this.regionsGeoJson) {
        this.loadPrefectures(e.target.feature.geometry.properties.id);
        // this.map?.removeLayer(this.regionsGeojson);
      }
    };
  }

  /**
   * load prefectures of given region id. Then shows them in the map
   * @param id the region id
   * @private
   */
  private loadPrefectures(id: number) {
    this.exploreMapService.getPrefecturesByRegion(id).subscribe({
      next: (data: PrefectureGeomSimple[]) => {
        if (this.map) {
          this.initialisePrefectures(data);
          this.initializePrefectureCapitals(data);

          if (this.regionsGeoJson) {
            this.map?.removeLayer(this.regionsGeoJson);
          }
        }
      }
    });
  }

  private initialisePrefectures(data: PrefectureGeomSimple[]) {
    this.currentPrefectures = data.map(p => {
      return {
        id: p.id,
        nameGr: p.nameGr,
        nameEn: p.nameEn,
        capital: p.capital,
        population: p.population,
        shapeArea: p.shapeArea
      }
    });
    const prefectureGeoJsons: geojson.GeoJsonObject[] = [];
    data.forEach((item: PrefectureGeomSimple) => {
      const prefecture: geojson.Feature = item.geom;
      prefecture.properties = {
        ...item
      };
      prefectureGeoJsons.push(prefecture);
    });
    this.prefectureGeoJson = L.geoJson(prefectureGeoJsons);
    // add event listeners for each layer (prefecture). Similar to the commented part above
    for (let prefectureItem of this.prefectureGeoJson.getLayers()) {
      prefectureItem.addEventListener({
        mouseover: this.highlightFeature,
        mouseout: this.onPrefectureMouseOut.bind(this),
        click: this.map ? this.onPrefectureClicked(this.map) : undefined
      })
    }

    if (this.map) {
      this.prefectureGeoJson.addTo(this.map);
    }
  }

  private initializePrefectureCapitals(data: PrefectureGeomSimple[]) {
    const capitalsGeoJsons: geojson.GeoJsonObject[] = [];
    data.forEach((item: PrefectureGeomSimple) => {
      const capitalItem = item.capital;
      const capital: geojson.Feature = capitalItem.geom;
      capital.properties = {
        ...capitalItem
      }
      capitalsGeoJsons.push(capital);
    });

    this.capitalsGeoJson = this.getCapitalsGeoJson(capitalsGeoJsons);
    if (this.map) {
      this.capitalsGeoJson.addTo(this.map);
    }
  }

  private getCapitalsGeoJson(capitalsGeoJsons: GeoJsonObject[]) {
    const icon = L.icon({
      iconUrl: 'assets/images/markers/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    return L.geoJson(capitalsGeoJsons, {
      pointToLayer(geoJsonPoint: Feature<Point, any>, latlng: LatLng): Layer {
        const capitalData = geoJsonPoint.properties;
        const markerOptions = {
          title: geoJsonPoint.properties.name,
          clickable: true,
          draggable: false,
          icon: icon
        };
        const marker = L.marker(latlng, markerOptions);

        marker.bindPopup(layer => {
          const population = new Intl.NumberFormat('el-GR', {})
            .format(capitalData.population);

          return `
                  <p class="font-bold">${capitalData.name}</p>
                  <p>Πληθυσμός: <strong>${population}</strong></p>
                `;
        });

        return marker;
      }
    });
  }

  onPrefectureMouseOut(e: LeafletMouseEvent) {
    const layer = e.target;
    if (this.selectedPrefecture === layer) {
      layer.setStyle({
        weight: 5,
        color: '#888',
        dashArray: '',
        fillOpacity: 0.7,
      });
    } else {
      this.prefectureGeoJson?.resetStyle(layer);
    }
  }

  onPrefectureClicked(map: L.Map) {
    return (e: LeafletMouseEvent) => {
      // map.fitBounds(e.target.getBounds());
      const layer = e.target;
      if (this.selectedPrefecture === layer) {
        this.prefectureGeoJson?.resetStyle(this.selectedPrefecture);
        this.selectedPrefecture = undefined;
      } else {
        layer.setStyle({
          weight: 5,
          color: '#888',
          dashArray: '',
          fillOpacity: 0.7,
        });
        console.log(e.target.feature.geometry.properties);
        if (this.selectedPrefecture) {
          this.prefectureGeoJson?.resetStyle(this.selectedPrefecture);
        }
        this.selectedPrefecture = layer;
      }
    };
  }
}
