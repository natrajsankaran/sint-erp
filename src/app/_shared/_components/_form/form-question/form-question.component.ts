import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../_types/_form/question';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
