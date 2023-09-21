import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import jwtDecode from 'jwt-decode';
import { IPayload } from '../models/resource/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _account = new BehaviorSubject<IPayload | null>(null);

  constructor(private storageService: StorageService) {
    const token = this.storageService.getToken();
    if (token) this.decodeAndNotify(token);
  }

  public saveSession(token: string) {
    this.storageService.saveToken(token);
    this.decodeAndNotify(token);
  }

  private decodeAndNotify(token: string) {
    const payload = jwtDecode<IPayload>(token);
    this._account.next(payload);
  }

  public get account() {
    return this._account.asObservable();
  }
}
