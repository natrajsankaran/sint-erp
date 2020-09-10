import { Component, OnInit, Input } from '@angular/core';
import { Question, InputStyle } from '../../../_types/_form/question';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() form: FormGroup;

  public get inputStyle(): InputStyle {
    return this.question.hasOwnProperty('options') && this.question.options.hasOwnProperty('inputStyle') ? this.question.options.inputStyle : null;
  }

  public get labelCssClasses(): string {
    return this.inputStyle && this.inputStyle.hasOwnProperty('controlHorizontal') && this.inputStyle.controlHorizontal.hasOwnProperty('labelCssClasses') ? this.inputStyle.controlHorizontal.labelCssClasses : '';
  }

  public get controlCssClasses(): string {
    return this.inputStyle.hasOwnProperty('controlHorizontal') && this.inputStyle.controlHorizontal.hasOwnProperty('controlCssClasses') ? this.inputStyle.controlHorizontal.controlCssClasses : '';
  }

  constructor() { }

  ngOnInit(): void {

  }

}
