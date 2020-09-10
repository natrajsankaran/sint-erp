import { Injectable } from '@angular/core';
import { Question, ControlType, Questionnaire } from '../../_types/_form/question';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormQuestionUtilityService {

  constructor() { }

  convertQuestionsToQuestionnaire(questions: Question[]): Questionnaire {
    let questionnaire: Questionnaire = {};
    for (const question of questions) {
      questionnaire[question.privateKey] = question;
    }
    return questionnaire;
  }

  buildFormFromQuestions(questions: Question[], data: { [k: string]: any } = {}, hasIdentifier: boolean = false): FormGroup {
    let config: { [k: string]: any } = {};

    // add _id property hasIdentifier is false
    if (hasIdentifier) {
      let value = data.hasOwnProperty('_id') ? data['_id'] : null;
      config["_id"] = new FormControl(value);
    }

    // assign properties and populate them
    for (const question of questions) {
      let value = data.hasOwnProperty(question.privateKey) ? data[question.privateKey] : null;
      config[question.privateKey] = new FormControl(value);
    }

    return new FormGroup(config);
  }

  initializeDefaultValueForQuestion(question: Question): string | boolean | null {
    switch (question.controlType) {
      case ControlType.TEXTBOX:
        return "";
      case ControlType.CHECKBOX:
        return true;
      default:
        return null;
    }
  }
}
