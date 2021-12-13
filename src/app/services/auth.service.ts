import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = 'http://localhost:3000/auth';
  private subjUser$: Subject<User> = new BehaviorSubject<any>(null);
  private subjLoggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  credentials(credential: {
    name: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credential).pipe(
      tap((user: any) => {
        this.subjLoggedIn$.next(true);
        this.subjUser$.next(user);
        localStorage.setItem('token', user.token);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.subjLoggedIn$.asObservable();
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }
}
