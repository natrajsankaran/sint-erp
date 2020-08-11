import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Tax } from '../../_types/master-data/tax';
import { API_TAX } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newTax: Tax): Observable<Tax[]> {
    return this.apiService.postData(API_TAX, newTax);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_TAX);
  }

  get(taxId: string): Observable<any> {
    return this.apiService.getData(API_TAX + "/" + taxId);
  }

  update(taxId: string, updatedTax: object): Observable<any> {
    return this.apiService.postData(API_TAX + "/" + taxId, updatedTax);
  }

}
