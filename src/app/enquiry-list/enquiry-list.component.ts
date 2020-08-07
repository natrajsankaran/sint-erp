import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css']
})
export class EnquiryListComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

}
