import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prefecture} from "../models/prefecture";

@Injectable({
  providedIn: 'root'
})
export class PrefectureService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPrefecturesByRegion(regionId: number): Observable<any> {
    return this.http.get(this.apiUrl + 'prefectures/geom/region/' + regionId);
  }

  getPrefectureDetails(prefectureId: number): Observable<Prefecture> {
    return this.http.get<Prefecture>(this.apiUrl + 'prefectures/geom/' + prefectureId);
  }

}
