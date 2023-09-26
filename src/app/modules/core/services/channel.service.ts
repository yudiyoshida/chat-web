import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/resource/user.model';
import { StorageService } from '../auth/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private _users$ = new BehaviorSubject<IUser[] | null>(null);

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
  ) {
    const token = this.storageService.getToken();
    if (token) this.getAllUsers();
  }

  private notify(users: IUser[]) {
    this._users$.next(users);
  }

  public getAllUsers() {
    this.http.get<IUser[]>(`${environment.api}/users`).subscribe({
      next: (res) => this.notify(res),
    });
  }

  public get users() {
    return this._users$.asObservable();
  }
}
