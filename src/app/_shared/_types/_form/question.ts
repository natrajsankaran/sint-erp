export enum ControlType {
  TEXTBOX = "TEXTBOX",
  CHECKBOX = "CHECKBOX",
}

export enum ValidatorType {
  REQUIRED = "REQUIRED",
}

export interface Question {
  privateKey: string;
  controlType: ControlType;
  label: string;
  value?: any;
  validators?: ValidatorType[],
  displayOrderWeight?: number;
  options?: { [privateKey: string]: any };
}

export interface Questionnaire {
  [privateKey: string]: Question;
}
