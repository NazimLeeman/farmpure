import { Injectable } from '@angular/core';
import { PGService } from './pg.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { FarmAsset, Organization } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FarmService extends PGService<Organization> {
  constructor(http: HttpClient) {
    super(`${environment.api}/organizations`, http); // organizations table
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetService extends PGService<FarmAsset> {
  constructor(http: HttpClient) {
    super(`${environment.api}/farm_assets`, http); // farm_assets table
  }
}
