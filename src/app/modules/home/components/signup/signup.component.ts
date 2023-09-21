import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISignUpForm } from 'src/app/modules/core/models/forms/signup.model';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public hide = true;
  public signupForm!: FormGroup<ISignUpForm>;

  public image!: File;
  public imagePreview!: string | null;

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createSignupForm();
  }

  public createSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public getError(field: string, error: string) {
    return this.signupForm.get(field)?.hasError(error);
  }

  public onFileChange(event: Event) {
    this.image = (event.target as HTMLInputElement).files?.[0] as File;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.image);
  }

  public onSubmit() {
    const body = this.signupForm.getRawValue();

    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('email', body.email);
    formData.append('password', body.password);
    formData.append('image', this.image);

    this.userService.register(formData).subscribe({
      next: () => {
        this.toastr.success('Account created successfully!');
        this.router.navigate(['/']);
      },
    });
  }
}
