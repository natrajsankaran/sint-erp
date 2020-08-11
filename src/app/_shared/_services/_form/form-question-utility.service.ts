import { Injectable } from '@angular/core';
import { Questionnaire, Question } from '../../_types/_form/question';

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
}
