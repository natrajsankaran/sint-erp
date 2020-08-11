import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './_shared/_services/api.service';
import { Enquiry } from './_types/enquiry';
import { API_ENQUIRY } from './_shared/api-routes';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(
    private apiService: ApiService
  ) { }

  create(newEnquiry: Enquiry): Observable<Enquiry[]> {
    return this.apiService.postData(API_ENQUIRY, newEnquiry);
  }

  list(): Observable<any> {
    return this.apiService.getData(API_ENQUIRY);
  }

  get(enquiryId: string): Observable<any> {
    return this.apiService.getData(API_ENQUIRY + "/" + enquiryId);
  }

  update(enquiryId: string, updatedEnquiry: object): Observable<any> {
    return this.apiService.postData(API_ENQUIRY + "/" + enquiryId, updatedEnquiry);
  }

}
