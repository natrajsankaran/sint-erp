import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Currency } from '../../_types/master-data/currency';
import { API_CURRENCY } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newCurrency: Currency): Observable<Currency[]> {
    return this.apiService.postData(API_CURRENCY, newCurrency);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_CURRENCY);
  }

  get(currencyId: string): Observable<any> {
    return this.apiService.getData(API_CURRENCY + "/" + currencyId);
  }

  update(currencyId: string, updatedCurrency: object): Observable<any> {
    return this.apiService.postData(API_CURRENCY + "/" + currencyId, updatedCurrency);
  }

}
