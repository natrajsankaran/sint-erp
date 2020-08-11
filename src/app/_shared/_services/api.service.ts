import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CURRENCIES } from '../../_mock/master-data/currency';
import { TAXES } from '../../_mock/master-data/tax';
import { ENQUIRIES } from '../../_mock/enquiry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getData(url: string): Observable<any> {
    switch (url) {
      case '/api/master-data/currency':
        return of(CURRENCIES);

      case '/api/master-data/tax':
        return of(TAXES);

      case '/api/enquiry':
        return of(ENQUIRIES);

      default:
        return of([]);
    }
  }

  //  underscore was added to ignore warning in atom.io
  postData(_url: string, _data: any): Observable<any> {
    return of(null);
  }
}
