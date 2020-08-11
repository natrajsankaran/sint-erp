import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { PackagingStandard } from '../../_types/master-data/packaging-standard';
import { API_PACKAGING_STANDARD } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class PackagingStandardService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newPackagingStandard: PackagingStandard): Observable<PackagingStandard[]> {
    return this.apiService.postData(API_PACKAGING_STANDARD, newPackagingStandard);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_PACKAGING_STANDARD);
  }

  get(packagingStandardId: string): Observable<any> {
    return this.apiService.getData(API_PACKAGING_STANDARD + "/" + packagingStandardId);
  }

  update(packagingStandardId: string, updatedPackagingStandard: object): Observable<any> {
    return this.apiService.postData(API_PACKAGING_STANDARD + "/" + packagingStandardId, updatedPackagingStandard);
  }

}
