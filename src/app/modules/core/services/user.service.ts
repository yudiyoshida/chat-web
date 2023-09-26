import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/resource/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public register(data: FormData) {
    return this.http.post<IUser>(`${environment.api}/users`, data);
  }

  public getAll() {
    return this.http.get<IUser[]>(`${environment.api}/users`);
  }
}
