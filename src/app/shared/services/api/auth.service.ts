import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, UserCredential,
} from '@angular/fire/auth';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { forkJoin, from, Observable, switchMap } from 'rxjs';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly auth: Auth,
    private readonly userService: UserService,
  ) {
    onAuthStateChanged(this.auth, (user) => this.userService.setUser(user));
  }

  public login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public register(email: string, password: string, displayName: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => forkJoin([
        this.sendEmailVerification(user),
        updateProfile(user, { displayName }),
      ])),
    );
  }

  public signInWithGoogle(): Observable<UserCredential> {
    return this.signInWithPopup(new GoogleAuthProvider());
  }

  public signInWithFacebook(): Observable<UserCredential> {
    return this.signInWithPopup(new FacebookAuthProvider());
  }

  public sendEmailVerification(user: User): Observable<void> {
    return from(sendEmailVerification(user));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  private signInWithPopup(provider: AuthProvider): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, provider));
  }
}
