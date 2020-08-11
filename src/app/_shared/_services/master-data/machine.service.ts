import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Machine } from '../../_types/master-data/machine';
import { API_MACHINE } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newMachine: Machine): Observable<Machine[]> {
    return this.apiService.postData(API_MACHINE, newMachine);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_MACHINE);
  }

  get(machineId: string): Observable<any> {
    return this.apiService.getData(API_MACHINE + "/" + machineId);
  }

  update(machineId: string, updatedMachine: object): Observable<any> {
    return this.apiService.postData(API_MACHINE + "/" + machineId, updatedMachine);
  }

}
