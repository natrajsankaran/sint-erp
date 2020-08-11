import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { RawMaterial } from '../../_types/master-data/raw-material';
import { API_RAW_MATERIAL } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newRawMaterial: RawMaterial): Observable<RawMaterial[]> {
    return this.apiService.postData(API_RAW_MATERIAL, newRawMaterial);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_RAW_MATERIAL);
  }

  get(rawMaterialId: string): Observable<any> {
    return this.apiService.getData(API_RAW_MATERIAL + "/" + rawMaterialId);
  }

  update(rawMaterialId: string, updatedRawMaterial: object): Observable<any> {
    return this.apiService.postData(API_RAW_MATERIAL + "/" + rawMaterialId, updatedRawMaterial);
  }

}
