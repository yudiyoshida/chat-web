import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private KEY = 'ng-chat-token';

  public getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.KEY, token);
  }

  public deleteToken(): void {
    localStorage.removeItem(this.KEY);
  }
}
