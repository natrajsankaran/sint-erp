import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Blend } from '../../_types/master-data/blend';
import { API_BLEND } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class BlendService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newBlend: Blend): Observable<Blend[]> {
    return this.apiService.postData(API_BLEND, newBlend);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_BLEND);
  }

  get(blendId: string): Observable<any> {
    return this.apiService.getData(API_BLEND + "/" + blendId);
  }

  update(blendId: string, updatedBlend: object): Observable<any> {
    return this.apiService.postData(API_BLEND + "/" + blendId, updatedBlend);
  }

}
