import { FormControl } from '@angular/forms';

export interface ISignInForm {
  credential: FormControl<string>;
  password: FormControl<string>;
}
