import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquiry-create',
  templateUrl: './enquiry-create.component.html',
  styleUrls: ['./enquiry-create.component.css']
})
export class EnquiryCreateComponent implements OnInit {

  isDeveloperNotesShown: boolean = false;
  toggleDeveloperNotesShown() {
    this.isDeveloperNotesShown = !this.isDeveloperNotesShown;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
