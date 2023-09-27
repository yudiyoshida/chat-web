import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { IPayload } from '../models/resource/auth.model';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _account = new BehaviorSubject<IPayload | null>(null);

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {
    const token = this.storageService.getToken();
    if (token) this.decodeAndNotify(token);
  }

  private decodeAndNotify(token: string) {
    const payload = jwtDecode<IPayload>(token);
    this._account.next(payload);
  }

  public saveSession(token: string) {
    this.storageService.saveToken(token);
    this.decodeAndNotify(token);
  }

  public deleteSession() {
    this.storageService.deleteToken();
    this.router.navigate(['/']);
  }

  public get account() {
    return this._account.asObservable();
  }
}
