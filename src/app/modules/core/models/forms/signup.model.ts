import { FormControl } from '@angular/forms';

export interface ISignUpForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
