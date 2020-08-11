import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Equipment } from '../../_types/master-data/equipment';
import { API_EQUIPMENT } from '../../api-routes';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newEquipment: Equipment): Observable<Equipment[]> {
    return this.apiService.postData(API_EQUIPMENT, newEquipment);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_EQUIPMENT);
  }

  get(equipmentId: string): Observable<any> {
    return this.apiService.getData(API_EQUIPMENT + "/" + equipmentId);
  }

  update(equipmentId: string, updatedEquipment: object): Observable<any> {
    return this.apiService.postData(API_EQUIPMENT + "/" + equipmentId, updatedEquipment);
  }

}
