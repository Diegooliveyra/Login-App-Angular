import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = 'http://localhost:3000/auth';
  private subjUser$: Subject<any> = new BehaviorSubject<any>(null);
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
    const token = localStorage.getItem('token');
    if (token && this.subjLoggedIn$) {
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
    localStorage.removeItem('token');
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`).pipe(
      tap((user: User) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.subjUser$.next(user);
          this.subjLoggedIn$.next(true);
        }
      }),
      map((user: User) => (user ? true : false)),
      catchError((error)=> {
        this.logout()

        return throwError(error)
      })
    );
  }
}
