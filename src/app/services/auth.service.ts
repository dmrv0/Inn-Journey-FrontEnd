import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/authResponse';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';
import { LocalStorageService } from './localstorage.service';
import { userModal } from '../model/Entities/userModal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $refreshToken = new Subject<boolean>();
  private loginStatusSubject = new BehaviorSubject<boolean>(this.isLogin());

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  url = "https://localhost:7171/api/Auths";

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/Login`, {
      usernameOrEmail: email,
      password: password
    }).pipe(
      tap(response => {
        this.handleAuthentication(response);
      })
    );
  }





  private handleAuthentication(response: AuthResponse) {
    const accessToken = response.token.accessToken;
    const refreshToken = response.token.refreshToken;
    const expiration = response.token.expiration;
    const userId = response.token.userId;
    const user = new User(accessToken, refreshToken, expiration, userId);

    this.localService.removeItem("Token");
    this.localService.setItem("Token", response.token);
   // this.emitLoginStatus(true); bir problem olursa burası
  }

  logout() {
    this.localService.removeItem('Token');
    this.emitLoginStatus(false);
  }

  refreshToken(token: string): Observable<AuthResponse> {
    const data: any = {
      refreshToken: token
    };
    return this.http.post<AuthResponse>(`${this.url}/RefreshTokenLogin`, data).pipe(
      tap(response => {
        this.localService.removeItem("Token");
        this.localService.setItem("Token", response.token);
      })
    );
  }

  private isLogin(): boolean {
    return !!this.localService.getItem('Token');
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatusSubject.asObservable();
  }

  emitLoginStatus(status: boolean) {
    this.loginStatusSubject.next(status);
  }
}
