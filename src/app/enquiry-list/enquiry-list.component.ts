import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnquiryService } from '../enquiry.service';
import { Enquiry } from '../_types/enquiry';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css']
})
export class EnquiryListComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();
  enquiriesListData: Enquiry[];

  isDeveloperNotesShown: boolean = false;
  toggleDeveloperNotesShown(){
    this.isDeveloperNotesShown = !this.isDeveloperNotesShown;
  }

  constructor(
    private enquiryService: EnquiryService
  ) { }

  ngOnInit(): void {
    /* set loading statuses */

    /* initialise with default values */
    this.enquiriesListData = [];

    /* initialise with values from server */
    this.enquiryService.list().pipe(takeUntil(this.destroySubject$)).subscribe((enquiries: Enquiry[]) => {
      this.enquiriesListData = enquiries;
    });

  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

}
