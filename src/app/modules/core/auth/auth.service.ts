import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISigninRequest, ISigninResponse } from '../models/resource/auth.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {}

  public login(data: ISigninRequest) {
    return this.http.post<ISigninResponse>(`${environment.api}/auth/login`, data).pipe(
      tap(res => this.accountService.saveSession(res.token)),
    );
  }
}
