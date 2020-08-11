import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormQuestionComponent } from './_components/_form/form-question/form-question.component';

@NgModule({
  declarations: [
    FormQuestionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormQuestionComponent
  ]
})
export class SharedModule { }
