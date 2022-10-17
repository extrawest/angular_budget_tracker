import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, UserCredential,
} from '@angular/fire/auth';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { BehaviorSubject, filter, forkJoin, from, Observable, switchMap, tap } from 'rxjs';

import { isNotNullOrUndefined } from '../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser$: Observable<User>;

  private readonly currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor(private readonly auth: Auth) {
    this.currentUser$ = this.currentUserSubject$.asObservable().pipe(filter(isNotNullOrUndefined));

    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject$.next(user);
    });
  }

  public login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public register(email: string, password: string, displayName: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => forkJoin([
        this.sendEmailVerification(user),
        updateProfile(user, {
          displayName,
        }),
      ])),
    );
  }

  public async signInWithGoogle(): Promise<User> {
    return this.signInWithPopup(new GoogleAuthProvider());
  }

  public async signInWithFacebook(): Promise<User> {
    return this.signInWithPopup(new FacebookAuthProvider());
  }

  public sendEmailVerification(user: User): Observable<void> {
    return from(sendEmailVerification(user));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  private async signInWithPopup(provider: AuthProvider): Promise<User> {
    const { user } = await signInWithPopup(this.auth, provider);

    return user;
  }
}
