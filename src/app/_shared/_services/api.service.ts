import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CURRENCIES } from '../../_mock/master-data/currency';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getData(url: string): Observable<any> {
    switch (url) {
      case '/api/master-data/currency':
        return of(CURRENCIES);

      default:
        return of(null);
    }
  }

  //  underscore was added to ignore warning in atom.io
  postData(_url: string, _data: any): Observable<any> {
    return of(null);
  }
}
