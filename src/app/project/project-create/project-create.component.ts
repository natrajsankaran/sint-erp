import { Component, OnInit } from '@angular/core';
import { Question, ControlType, ValidatorType, Questionnaire, INPUT_STYLE_HORIZONTAL_A } from '../../_shared/_types/_form/question';
import { FormGroup } from '@angular/forms';
import { FormQuestionUtilityService } from '../../_shared/_services/_form/form-question-utility.service';

const PROJECT_QUESTIONS: Question[] = [
  {
    privateKey: "title",
    controlType: ControlType.TEXTBOX,
    label: "Title",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      inputStyle: INPUT_STYLE_HORIZONTAL_A
    },
  },
  {
    privateKey: "description",
    controlType: ControlType.TEXTAREA,
    label: "Description",
    validators: [],
    displayOrderWeight: -2,
    options: {
      inputStyle: INPUT_STYLE_HORIZONTAL_A
    },
  },
];

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  projectCreateFormQuestionnaire: Questionnaire;
  projectCreateForm: FormGroup;
  isLinkedToAnEnquiry: boolean;
  hasAccessControlShown: boolean;
  isAccessControlFromPreset: boolean;
  hasAdvancedShown: boolean;

  isDeveloperNotesShown: boolean = false;
  toggleDeveloperNotesShown() {
    this.isDeveloperNotesShown = !this.isDeveloperNotesShown;
  }

  constructor(
    private formQuestionUtilityService: FormQuestionUtilityService,
  ) { }

  ngOnInit(): void {
    this.isLinkedToAnEnquiry = true;
    this.hasAdvancedShown = false;
    this.hasAccessControlShown = false;
    this.isAccessControlFromPreset = true;
    this.projectCreateFormQuestionnaire = this.formQuestionUtilityService.convertQuestionsToQuestionnaire(PROJECT_QUESTIONS);
    this.projectCreateForm = this.formQuestionUtilityService.buildFormFromQuestions(PROJECT_QUESTIONS);
  }

  toggleLinkToEnquiry() {
    this.isLinkedToAnEnquiry = !this.isLinkedToAnEnquiry;
  }

  toggleAccessControl() {
    this.hasAccessControlShown = !this.hasAccessControlShown;
  }

  toggleAccessControlFromPreset() {
    this.isAccessControlFromPreset = !this.isAccessControlFromPreset;
  }

  toggleAdvanced() {
    this.hasAdvancedShown = !this.hasAdvancedShown;
  }

}
