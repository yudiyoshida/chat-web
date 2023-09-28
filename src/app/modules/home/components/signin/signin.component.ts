import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { ISignInForm } from 'src/app/modules/core/models/forms/auth.model';
import { SocketioService } from 'src/app/modules/core/services/socketio.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public hide = true;
  public signinForm!: FormGroup<ISignInForm>;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private socketService: SocketioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createSigninForm();
  }

  public createSigninForm() {
    this.signinForm = this.fb.group({
      credential: ['user1@getnada.com', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['123456789', [Validators.required]],
    });
  }

  public getError(field: string, error: string) {
    return this.signinForm.get(field)?.hasError(error);
  }

  public onSubmit() {
    const data = this.signinForm.getRawValue();
    this.authService.login(data).subscribe({
      next: () => {
        this.router.navigate(['/chats']);
        this.socketService.connect();
      },
    });
  }
}
