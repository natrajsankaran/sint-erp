import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

}
