export enum ControlType {
  TEXTBOX = "TEXTBOX",
  TEXTAREA = "TEXTAREA",
  CHECKBOX = "CHECKBOX",
}

export enum ValidatorType {
  REQUIRED = "REQUIRED",
}

export interface ControlHorizontalStyle {
  labelCssClasses?: string;
  controlCssClasses?: string;
}

export interface InputStyle {
  controlHorizontal?: ControlHorizontalStyle;
}

export const INPUT_STYLE_HORIZONTAL_A: InputStyle = {
  controlHorizontal: {
    labelCssClasses: 'col-lg-3 col-md-3 col-sm-3 col-xs-12',
    controlCssClasses: 'col-lg-9 col-md-9 col-sm-9 col-xs-12',
  }
}

export interface Question {
  privateKey: string;
  controlType: ControlType;
  label: string;
  value?: any;
  validators?: ValidatorType[];
  displayOrderWeight?: number;
  options?: {
    [privateKey: string]: any,
    inputStyle?: InputStyle
  };
}

export interface Questionnaire {
  [privateKey: string]: Question;
}
