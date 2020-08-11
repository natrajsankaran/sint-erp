import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Operation } from '../../_types/master-data/operation';
import { API_OPERATION } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newOperation: Operation): Observable<Operation[]> {
    return this.apiService.postData(API_OPERATION, newOperation);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_OPERATION);
  }

  get(operationId: string): Observable<any> {
    return this.apiService.getData(API_OPERATION + "/" + operationId);
  }

  update(operationId: string, updatedOperation: object): Observable<any> {
    return this.apiService.postData(API_OPERATION + "/" + operationId, updatedOperation);
  }

}
