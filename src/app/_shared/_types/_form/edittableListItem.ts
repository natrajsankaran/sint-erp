import { FormGroup } from "@angular/forms";

export interface EdittableListItem {
  _id?: string;
  isEditted: boolean;
  editForm: FormGroup;
}
